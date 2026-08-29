"""IndicTrans2 translation for ClauseWise.

Model: ai4bharat/indictrans2-en-indic-dist-200M (the official distilled
variant). The 1B model was skipped deliberately: 4.46 GB of weights on an 8 GB
machine that already holds spaCy and Presidio would swap, and a demo that
stutters is worse than one that uses a smaller model well.

Two implementation notes worth keeping:

  * `use_cache=False` is required. IndicTrans2's remote modeling code indexes
    `past_key_values` as a tuple, while transformers 4.57 passes a Cache object,
    so generation crashes with the cache on. Disabling it costs speed but works.
  * Greedy decoding (num_beams=1) runs ~7x faster than beam search — 0.40s per
    string against 2.76s — with output that reads the same for short declarative
    sentences. Translation happens at build time, but speed still decides
    whether rebuilding the catalogue is a coffee break or an afternoon.

This module NEVER decides what is safe to translate. Callers send text with
protected values already replaced by {0}-style slots; see protect.ts.
"""

from __future__ import annotations

import os
import threading
import time
from dataclasses import dataclass

# Language code -> IndicTrans2 language tag.
LANGUAGES: dict[str, str] = {
    "hi": "hin_Deva",
    "mr": "mar_Deva",
    "ta": "tam_Taml",
    "te": "tel_Telu",
}

DEFAULT_MODEL = "ai4bharat/indictrans2-en-indic-dist-200M"

_lock = threading.Lock()
_state: dict[str, object] = {}


class TranslationUnavailable(Exception):
    """Raised when the model cannot be loaded or used.

    Callers are expected to fall back to English rather than surface this.
    """


@dataclass
class TranslationResult:
    translations: list[str]
    seconds: float
    model: str


def _load():
    """Load the model once, on first use. Never at import time."""
    if _state:
        return _state
    with _lock:
        if _state:
            return _state
        try:
            import torch
            from transformers import AutoModelForSeq2SeqLM, AutoTokenizer
            from IndicTransToolkit.processor import IndicProcessor
        except ImportError as error:
            raise TranslationUnavailable(f"translation dependencies missing: {error}") from error

        model_id = os.environ.get("INDICTRANS_MODEL", DEFAULT_MODEL)
        try:
            tokenizer = AutoTokenizer.from_pretrained(model_id, trust_remote_code=True)
            model = AutoModelForSeq2SeqLM.from_pretrained(
                model_id, trust_remote_code=True, dtype=torch.float32
            )
            model.eval()
        except Exception as error:  # noqa: BLE001 - any failure means fall back
            raise TranslationUnavailable(f"could not load {model_id}: {error}") from error

        _state.update(
            {
                "torch": torch,
                "tokenizer": tokenizer,
                "model": model,
                "processor": IndicProcessor(inference=True),
                "model_id": model_id,
            }
        )
        return _state


def is_available() -> bool:
    """Whether translation can run, without forcing a load."""
    if os.environ.get("DISABLE_TRANSLATION", "").strip():
        return False
    try:
        import torch  # noqa: F401
        import transformers  # noqa: F401
        import IndicTransToolkit  # noqa: F401
    except ImportError:
        return False
    return True


def translate(texts: list[str], language: str) -> TranslationResult:
    """Translate English strings into one Indic language.

    Raises TranslationUnavailable on any failure. The caller falls back to
    English; translation is an enhancement and must never break a response.
    """
    if os.environ.get("DISABLE_TRANSLATION", "").strip():
        raise TranslationUnavailable("translation disabled by environment")

    tag = LANGUAGES.get(language)
    if not tag:
        raise TranslationUnavailable(f"unsupported language {language!r}")
    if not texts:
        return TranslationResult(translations=[], seconds=0.0, model=DEFAULT_MODEL)

    state = _load()
    torch = state["torch"]
    tokenizer = state["tokenizer"]
    model = state["model"]
    processor = state["processor"]

    started = time.time()
    try:
        batch = processor.preprocess_batch(texts, src_lang="eng_Latn", tgt_lang=tag)
        encoded = tokenizer(batch, truncation=True, padding="longest", return_tensors="pt")
        with torch.inference_mode():
            generated = model.generate(
                **encoded,
                num_beams=1,
                max_length=512,
                min_length=0,
                # Required: see the module docstring.
                use_cache=False,
            )
        decoded = tokenizer.batch_decode(
            generated, skip_special_tokens=True, clean_up_tokenization_spaces=True
        )
        translations = processor.postprocess_batch(decoded, lang=tag)
    except Exception as error:  # noqa: BLE001
        raise TranslationUnavailable(f"translation failed: {error}") from error

    return TranslationResult(
        translations=translations,
        seconds=time.time() - started,
        model=str(state["model_id"]),
    )
