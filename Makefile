.PHONY: run lint format test coverage

run:
	uv run python log_analyzer.py
lint:
	uv run isort --check-only log_analyzer.py tests
	uv run black --check log_analyzer.py tests
	uv run flake8 log_analyzer.py tests
	uv run mypy log_analyzer.py
format:
	uv run isort log_analyzer.py tests
	uv run black log_analyzer.py tests
test:
	uv run python -m pytest tests -q
coverage:
	uv run python -m pytest tests --cov=log_analyzer --cov-report=term-missing