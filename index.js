const express = require('express');
const { getWarpConfigLink } = require('./warpConfig');
const path = require('path');

const app = express();

// Подключаем статические файлы
app.use(express.static(path.join(__dirname, 'public')));

// Главная страница
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Маршрут для генерации конфига
app.get('/warp', async (req, res) => {
    try {
        const content = await getWarpConfigLink();
        if (content) {
            res.json({ success: true, content });
        } else {
            res.status(500).json({ success: false, message: 'Не удалось сгенерировать конфиг.' });
        }
    } catch (error) {
        console.error('Ошибка при обработке запроса:', error);
        res.status(500).json({ success: false, message: 'Произошла ошибка на сервере.' });
    }
});

module.exports = app;
