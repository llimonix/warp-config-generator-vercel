const express = require('express');
const { getWarpConfigLink } = require('./warpConfig');
const path = require('path');

const app = express();

// Подключаем статические файлы (для логотипа и CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Главная страница
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Маршрут для генерации конфига
app.get('/warp', async (req, res) => {
    try {
        const link = await getWarpConfigLink();
        if (link) {
            res.json({ success: true, link });
        } else {
            res.status(500).json({ success: false, message: 'Не удалось сгенерировать конфиг.' });
        }
    } catch (error) {
        console.error('Ошибка при обработке запроса:', error);
        res.status(500).json({ success: false, message: 'Произошла ошибка на сервере.' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
