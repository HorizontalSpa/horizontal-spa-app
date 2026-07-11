const express = require('express');
const path = require('path');
const app = express();

// Раздача статических файлов из папки build (собранный React)
app.use(express.static(path.join(__dirname, 'build')));

// Все запросы отдаём index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
