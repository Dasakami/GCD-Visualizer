FROM python:3.11-slim

WORKDIR /code

# Создаем директорию для SQLite базы данных
RUN mkdir -p /code/data

COPY requirements.txt .

RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY ./app /code/app

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]