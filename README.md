# Task Tracker Application

Полнофункциональное мобильное веб-приложение для управления событиями и задачами с поддержкой повторяющихся событий.

## Архитектура

Приложение разделено на две части:

### Frontend (task-client)
- Vue.js 3
- Vuex
- Vue Router
- SASS
- Vite
- Day.js

### Backend (task-server) 
- NestJS
- PostgreSQL
- Sequelize ORM
- JWT + Passport
- OAuth 2.0

## Основной функционал

### Управление событиями
- Создание одиночных и повторяющихся событий
- Редактирование и удаление событий
- Календарное представление (день/неделя/месяц)
- Поиск и фильтрация событий
- Индикация пересечений событий
- Управление временем начала/окончания

### Пользователи
- Регистрация/авторизация
- OAuth авторизация (Google, VK, Yandex)
- Система ролей
- Управление профилем
- Безопасное хранение данных

## Структура базы данных

### Users
```javascript
- id (PK)
- name
- email (unique)
- password (hashed)
- role
- dateOfBirth
- phoneNumber
- avatar
- banned
- banReason
```

### Events
```javascript
BaseEvent:
- id (PK)
- event_name
- start_time
- end_time
- user_id (FK)
- created_at
- updated_at

RecurringEvent:
- id (PK)
- base_event_id (FK)
- week_day
- exceptions
- general_comment

SingleEvent:
- id (PK)
- base_event_id (FK)
- date
- comment
```

## API Endpoints

### События
```http
POST /events/create - создание события
GET /events/month?date=2024-03 - события за месяц
PUT /events/:id - обновление события
GET /events/search?name=встреча - поиск по названию
GET /events/:id - получение события по ID
DELETE /events/:id - удаление события
```

## Установка и запуск

### Backend (task-server)

1. Клонирование и установка:
```bash
git clone git@github.com:fkupme/task-tracker.git
cd task-server
npm install
```

2. Настройка .env:
```env
PORT=3002
DATABASE_URL=postgres://[username]:[password]@localhost:5432/task_tracker
JWT_SECRET=your_jwt_secret
```

3. Запуск:
```bash
# Разработка
npm run start:dev

# Продакшн
npm run build
npm run start
```

### Frontend (task-client)

1. Клонирование и установка:
```bash
git clone git@github.com:fkupme/task-tracker.git
cd task-client
npm install
```

2. Настройка .env:
```env
VITE_API_URL=https://task-tracker-server-4zwp.onrender.com
```

3. Запуск:
```bash
# Разработка
npm run dev

# Сборка
npm run build
npm run preview
```

## CORS

Серверная часть настроена для работы со следующими origins:
- http://localhost:5173
- http://127.0.0.1:5173
- https://task-tracker-rho-jet.vercel.app

## Безопасность

- JWT аутентификация
- OAuth 2.0
- Хеширование паролей (bcrypt)
- CORS
- Валидация данных
- Persistent storage (Vuex)

## Системные требования

### Backend
- Node.js >= 14
- PostgreSQL >= 13

### Frontend
- Node.js >= 14
- npm >= 6

## Разработка

### Backend скрипты
```bash
npm run start:dev    # Режим разработки
npm run build       # Сборка
npm run start      # Продакшн
npm run test       # Тесты
```

### Frontend скрипты
```bash
npm run dev      # Режим разработки
npm run build    # Сборка
npm run preview  # Предпросмотр
```

## Особенности реализации

### Frontend
- Компонентный подход
- Глобальная регистрация UI компонентов
- Кастомные директивы
- Адаптивный дизайн
- Персистентное хранение состояния

### Backend
- Модульная архитектура
- Типизация данных
- Миграции базы данных
- Логирование
- Обработка ошибок

## В разработке

- Улучшенная индикация пересечений событий
- Расширенные фильтры
- Уведомления
- Экспорт данных
- Интеграции с календарями
- Passport аутентификация