const express = require('express');
const cors = require('cors');
const path = require('path');
const { port, isDev } = require('./config');
const db = require('./db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Статика: в dev режиме раздаём public/ (иконки, картинки товаров),
// в production собранный фронтенд лежит в dist/ (см. vite.config.js)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));

// Маршруты API
app.use('/api', require('./routes/api'));

// Всё остальное отдаём как SPA (кроме /api — иначе 404 от API превращались бы в index.html)
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ success: false, message: 'Не найдено' });
  }
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Инициализация БД (создание таблиц при первом запуске), затем старт сервера
db.init()
  .catch((err) => console.error('Не удалось инициализировать БД, работаем на резервном хранилище в памяти:', err.message))
  .finally(() => {
    app.listen(port, () => {
      console.log(`Сервер запущен на порту ${port} в ${isDev ? 'режиме разработки' : 'production режиме'}`);
    });
  });

module.exports = app;
