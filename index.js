const express = require('express');
const { getWarpConfigLink } = require('./warpConfig');
const app = express();

app.get('/warp', async (req, res) => {
    try {
        const link = await getWarpConfigLink();
        if (link) {
            // Если генерация прошла успешно, делаем редирект на ссылку для скачивания
            res.redirect(link);
        } else {
            res.status(500).send('Не удалось сгенерировать конфиг.');
        }
    } catch (error) {
        console.error('Ошибка при обработке запроса:', error);
        res.status(500).send('Произошла ошибка на сервере.');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
