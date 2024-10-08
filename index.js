const express = require('express');
const { exec } = require('child_process');
const app = express();

app.get('/warp', (req, res) => {
  exec('bash warp_generator.sh', (error, stdout, stderr) => {
    if (error) {
      return res.status(500).send(`Ошибка: ${error.message}`);
    }
    if (stderr) {
      return res.status(500).send(`Ошибка: ${stderr}`);
    }

    const downloadLink = stdout.match(/https:\/\/immalware\.github\.io\/downloader\.html\?filename=WARP\.conf&content=[A-Za-z0-9+/=]+/);

    if (downloadLink) {
      res.send(`Генерация конфига завершена. Скачать конфиг можно по ссылке: ${downloadLink[0]}`);
    } else {
      res.status(500).send('Не удалось сгенерировать конфиг.');
    }
  });
});

const port = process.env.PORT || 3000;  // Используем переменную окружения PORT
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
