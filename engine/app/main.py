"""ClauseWise engine sidecar.

Two jobs, in this order: turn a document into text, then redact the personal
identifiers out of that text. Nothing else lives here — no auth, no database,
no business logic (IMPLEMENTATION.md section 3). Clause segmentation, and every
later engine, run in the Next.js app.

Redaction happens here, before the text is returned, so that everything
downstream — segmentation now, the LLM layer later — only ever sees redacted
text. The mapping back to the real values is returned to the Next.js server and
must not be forwarded to the browser.

The sidecar is not exposed to the browser. Only the Next.js server calls it,
so there is deliberately no CORS layer to widen that surface.
"""

from __future__ import annotations

import json
import os

from contextlib import asynccontextmanager

from fastapi import FastAPI, File, Form, UploadFile
from fastapi.responses import JSONResponse

from pydantic import BaseModel

from .extraction import SUPPORTED_EXTENSIONS, ExtractionError, extract
from .redaction import redact, warm_up
from .translation import LANGUAGES, TranslationUnavailable, is_available, translate

# 10 MiB default. Configurable, because a scanned rental agreement is bigger
# than a loan sanction letter, and a limit you cannot tune gets deleted.
DEFAULT_MAX_UPLOAD_BYTES = 10 * 1024 * 1024
CHUNK_SIZE = 1024 * 1024


def _max_upload_bytes() -> int:
    raw = os.environ.get("MAX_UPLOAD_BYTES")
    if not raw:
        return DEFAULT_MAX_UPLOAD_BYTES
    try:
        value = int(raw)
    except ValueError as error:
        raise RuntimeError(
            f"MAX_UPLOAD_BYTES must be an integer number of bytes, got {raw!r}."
        ) from error
    if value <= 0:
        raise RuntimeError("MAX_UPLOAD_BYTES must be greater than zero.")
    return value


MAX_UPLOAD_BYTES = _max_upload_bytes()

@asynccontextmanager
async def lifespan(_: FastAPI):
    # Load the NLP models before the first request rather than during it.
    warm_up()
    yield


app = FastAPI(
    title="ClauseWise Engine",
    version="0.2.0",
    summary="Local document text extraction and PII redaction for ClauseWise.",
    lifespan=lifespan,
)


@app.get("/health")
def health() -> dict[str, object]:
    return {
        "status": "ok",
        "service": "clausewise-engine",
        "supportedExtensions": sorted(SUPPORTED_EXTENSIONS),
        "maxUploadBytes": MAX_UPLOAD_BYTES,
        "redaction": "enabled",
        "translation": {
            "available": is_available(),
            "languages": sorted(LANGUAGES),
        },
    }


async def _read_capped(upload: UploadFile) -> bytes:
    """Read the upload, refusing anything past the cap.

    Read in chunks so an oversized file is rejected while it streams instead of
    being buffered in full first.
    """
    buffer = bytearray()
    while chunk := await upload.read(CHUNK_SIZE):
        buffer.extend(chunk)
        if len(buffer) > MAX_UPLOAD_BYTES:
            limit_mb = MAX_UPLOAD_BYTES / (1024 * 1024)
            raise ExtractionError(
                f"File is larger than the {limit_mb:.0f} MB limit.",
                status=413,
            )
    return bytes(buffer)


@app.post("/extract")
async def extract_document(
    file: UploadFile = File(...),
    known_names: str = Form("[]"),
) -> JSONResponse:
    """Extract text from one uploaded document, then redact it.

    The bytes stay in memory for the lifetime of this request and are never
    written to disk, so no raw copy of the user's document outlives the call.

    Returns the original text, the redacted text, and the mapping between them.
    The mapping is for the calling server only — it must never be forwarded to
    a browser or to any third party.
    """
    filename = file.filename or ""
    if not filename:
        return _error("The upload had no filename, so its type is unknown.", 400)

    try:
        data = await _read_capped(file)
        result = extract(data, filename)
    except ExtractionError as error:
        return _error(error.message, error.status)
    finally:
        await file.close()

    # Names the caller already knows belong to a person (the signed-in user's
    # own name). Supplied as a JSON array; a malformed value is ignored rather
    # than failing the upload.
    try:
        supplied = json.loads(known_names)
        names = [n for n in supplied if isinstance(n, str)] if isinstance(supplied, list) else []
    except (ValueError, TypeError):
        names = []

    redaction = redact(result.text, names)

    return JSONResponse(
        {
            "filename": filename,
            "kind": result.kind,
            "pages": result.pages,
            "bytes": len(data),
            "characters": len(result.text),
            "notes": result.notes,
            "text": result.text,
            "redactedText": redaction.redacted_text,
            "redaction": {
                "counts": redaction.counts,
                "total": redaction.total,
                # Server-side only. The Next.js route drops this before replying.
                "mapping": redaction.mapping,
            },
        }
    )


def _error(message: str, status: int) -> JSONResponse:
    # A single error shape so the Next.js layer can always show the real reason.
    return JSONResponse({"error": message}, status_code=status)


class TranslateRequest(BaseModel):
    """Text to translate. Protected values must already be {0}-style slots."""

    texts: list[str]
    language: str


@app.post("/translate")
def translate_texts(request: TranslateRequest) -> JSONResponse:
    """Translate English strings into one Indic language.

    A failure here is never fatal: the caller falls back to English. The 503
    carries the reason so an operator can see it, while users see English text.
    """
    if len(request.texts) > 128:
        return _error("Send at most 128 strings per request.", 400)
    try:
        result = translate(request.texts, request.language)
    except TranslationUnavailable as error:
        return _error(str(error), 503)

    return JSONResponse(
        {
            "language": request.language,
            "model": result.model,
            "seconds": round(result.seconds, 2),
            "translations": result.translations,
        }
    )
