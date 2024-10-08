const express = require('express');
const { getWarpConfigLink } = require('./warpConfig');
const app = express();

app.get('/warp', async (req, res) => {
    const link = await getWarpConfigLink();
    if (link) {
        res.send(`Генерация конфига завершена. Скачать конфиг можно по ссылке: ${link}`);
    } else {
        res.status(500).send('Не удалось сгенерировать конфиг.');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
