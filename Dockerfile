FROM python:3.14-slim
WORKDIR /app
RUN pip install --no-cache-dir uv==0.11.26
ENV UV_PROJECT_ENVIRONMENT=/app/.venv
ENV PATH="/app/.venv/bin:$PATH"
COPY pyproject.toml uv.lock README.md ./
RUN uv sync --locked --no-dev --no-install-project
COPY log_analyzer.py ./
COPY templates ./templates
ENTRYPOINT ["python", "/app/log_analyzer.py"]
CMD ["--help"]
