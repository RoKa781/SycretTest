# SycretTest: Сервис покупки сертификатов

## 🚀 Обзор проекта

    Веб-приложение для просмотра и покупки сертификатов

## 🏗 Архитектура проекта

- **Модульная архитектура** с использованием **Redux Toolkit** для управления состоянием.
- **Централизованное управление состоянием** через глобальный store.
- **Типизация** с помощью **TypeScript** для строгой проверки типов.
- Асинхронные операции выполняются через **createAsyncThunk**.

## 🛠 **Стек технологий**

- **Frontend**: React 18
- **State Management**: Redux Toolkit
- **Routing**: React Router
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Language**: TypeScript

## **Функциональность**

- Просмотр списка сертификатов.
- Оформление заказа с валидацией полей (имя, телефон, почта).
- Переход на страницу оплаты после успешного оформления заказа.

## 📦 Структура проекта

```
src/
│
├── app/                # Конфигурация приложения
│   ├── App.tsx
│   ├── AppLayout.tsx
│   └── store/
│       ├── store.ts
│       └── rootReducer.ts
│
├── features/            # Функциональные модули
│   ├── certificateListFeature/
│   │   ├── components/
│   │   └── CertificateListSlice.ts
│   │
│   └── orderFeature/
│       ├── OrderForm.tsx
│       └── OrderSlice.ts
│
├── pages/               # Страницы приложения
│   ├── MainPage/
│   ├── OrderPage/
│   └── PaymentPage/
│
├── components/          #Компоненты
│   ├── AppHeader/
│   └── NoImage/
│
├── config/              # Конфигурационные файлы
│   └── axiosConfig.ts
│
├── types/               # TypeScript типы
│   └── index.ts
│
└── utils/               # Утилиты
```
