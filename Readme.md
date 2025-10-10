Окей, Дэн. Я собрал оба README в один общий, удобный для использования и с учётом того, что теперь у тебя один `docker-compose`. Я сделал так, чтобы он охватывал и фронт, и бэк, объяснял как запускать, использовать API и визуализатор. Вот готовый вариант:

---

# 🧮 GCD Visualizer - Full Stack

Образовательный веб-сервис для визуализации алгоритма Евклида (поиск НОД) с пошаговой анимацией, авторизацией и историей вычислений.

![Stack](https://img.shields.io/badge/React-18.3-blue) ![Python](https://img.shields.io/badge/Python-3.11-blue) ![FastAPI](https://img.shields.io/badge/FastAPI-0.100-green) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)

---

## 🚀 Возможности

* Пошаговая визуализация алгоритма Евклида с анимациями
* JWT авторизация (регистрация и вход)
* История вычислений для каждого пользователя
* Теоретические материалы об алгоритме
* Настройка скорости воспроизведения: 0.5x, 1x, 2x
* Поддержка тёмной/светлой темы
* Docker-контейнеризация фронта и бэка
* Swagger документация для бэка

---

## 📁 Структура проекта

```
gcd-visualizer/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── core/
│   │   ├── db/
│   │   ├── routers/
│   │   ├── services/
│   │   └── schemas/
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── store/
│   │   ├── tests/
│   │   └── types/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── vitest.config.ts
├── docker-compose.yml
└── README.md
```

---

## 🛠 Технологии

### Backend

* Python 3.11, FastAPI
* PostgreSQL 15, SQLAlchemy, Pydantic
* JWT авторизация, bcrypt
* Docker-контейнеризация

### Frontend

* React 18 + TypeScript, Vite
* Tailwind CSS, Framer Motion
* Zustand для стейта
* Axios с refresh-токенами
* React Router v6

---

## 📦 Установка и запуск

### 1. С Docker (рекомендуется)

1. Клонируй репозиторий и перейди в папку проекта:

```bash
git clone <your-repo-url>
cd gcd-visualizer
```

2. Создай `.env` файлы для фронта и бэка (можно скопировать `.env.example`)

3. Запусти Docker Compose:

```bash
docker-compose up --build
```

Это запустит:

* Backend на `http://localhost:8000`
* Frontend на `http://localhost:3000`
* PostgreSQL

Swagger документация бэка: `http://localhost:8000/docs`

---

### 2. Без Docker

#### Backend

1. Установи зависимости:

```bash
cd backend
pip install -r requirements.txt
```

2. Настрой `.env` с `DATABASE_URL` и `SECRET_KEY`
3. Запусти:

```bash
uvicorn app.main:app --reload
```

#### Frontend

1. Установи зависимости:

```bash
cd frontend
npm install
```

2. Настрой `.env` с `VITE_API_URL=http://localhost:8000`
3. Запусти dev-сервер:

```bash
npm run dev
```

---

## 🔐 Авторизация и API

### Backend Endpoints

**Auth**

* `POST /auth/register` - регистрация
* `POST /auth/login` - вход
* `POST /auth/refresh` - обновление токена через httpOnly cookie

**GCD**

* `POST /gcd/calculate` - вычисление НОД (JWT обязателен)
* `GET /gcd/history` - история вычислений
* `GET /gcd/history/{id}` - конкретный результат
* `DELETE /gcd/history/{id}` - удалить результат

**Theory**

* `GET /theory/euclid`
* `GET /theory/complexity`
* `GET /theory/applications`

---

### Frontend интеграция

* Хранение access token в `sessionStorage`
* Refresh token в httpOnly cookie
* Axios interceptor для автоматического обновления токенов

---

## 🧮 Примеры использования

### Python (requests)

```python
import requests

token = requests.post("http://localhost:8000/auth/login", json={"email":"user@example.com","password":"pass"}).json()["access_token"]
headers = {"Authorization": f"Bearer {token}"}
res = requests.post("http://localhost:8000/gcd/calculate", json={"a":48,"b":18}, headers=headers)
print(res.json())
```

### JavaScript (fetch)

```javascript
const login = await fetch('http://localhost:8000/auth/login', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ email:'user@example.com', password:'pass' })});
const { access_token } = await login.json();
const result = await fetch('http://localhost:8000/gcd/calculate', { method: 'POST', headers:{ 'Content-Type':'application/json', 'Authorization': `Bearer ${access_token}` }, body: JSON.stringify({ a:48, b:18 })});
console.log(await result.json());
```

---

## 🎨 Дизайн и визуализация

* Анимации шагов алгоритма с Framer Motion
* Тёмная/светлая тема, адаптивный дизайн
* Управление скоростью воспроизведения (0.5x, 1x, 2x)
* Красивые интерактивные UI-компоненты

---

## 📝 TODO / улучшения

* Rate limiting и логирование
* Email верификация
* Расширенный алгоритм Евклида
* Экспорт истории (CSV/PDF)
* Тесты для фронта и бэка
* Redis кэширование

---
