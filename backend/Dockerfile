FROM python:3.11-slim

WORKDIR /code

# Установка postgresql-client для проверки подключения к БД
RUN apt-get update && \
    apt-get install -y postgresql-client && \
    rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY ./app /code/app

EXPOSE 8000

# Ждём пока БД будет готова, потом запускаем
CMD sh -c "until pg_isready -h gcd_postgres_db -U postgres; do echo 'Waiting for PostgreSQL...'; sleep 2; done && uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"