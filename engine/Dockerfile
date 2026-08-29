# ClauseWise engine sidecar — text extraction only.

FROM python:3.12-slim

WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY app ./app

# Run as a non-root user rather than as root.
RUN useradd --system --uid 1001 engine
USER engine

EXPOSE 8000
# Shell form so ${PORT} expands. Render (and most PaaS) assign the port at
# runtime; the 8000 fallback keeps docker compose working unchanged.
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]
