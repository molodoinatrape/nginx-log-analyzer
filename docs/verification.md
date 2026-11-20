# Локальная проверка

Повторная проверка: 2026-11-20, WSL Ubuntu, Python 3.14.6.

- `uv sync --locked` установил закреплённые зависимости.
- `make lint` и `make test` прошли: 33 теста, isort, Black, Flake8 и mypy.
- `uv build` собрал wheel и sdist.

Предыдущая проверка: 2026-11-05. Python 3.14.6 локально и Python 3.14.7 в контейнере.

- `make lint` и `make test` прошли: 33 теста, isort, Black, Flake8 и mypy.
- NaN, Infinity и переполнение при разборе времени считаются ошибками строки.
- Docker-образ собран из текущего кода. Compose-команда создала HTML/JS-отчёт
  по синтетическому логу в reports/docker/.
- Сборка wheel и sdist проверена. Установленный пакет ранее запускался вне
  исходной папки; автономный отчёт проверен в Chromium без сети.

Результаты CI публикуются в
[GitHub Actions](https://github.com/molodoinatrape/nginx-log-analyzer/actions).
