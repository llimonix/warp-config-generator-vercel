async function generateConfig() {
    const button = document.getElementById('generateButton');
    const status = document.getElementById('status');
    const randomNumber = Math.floor(Math.random() * (999 - 100 + 1)) + 100;

    // Изменяем состояние кнопки на загрузку
    button.disabled = true;
    button.innerHTML = '<div class="loader"></div>';

    try {
        const response = await fetch(`/warp`);
        const data = await response.json();

        if (data.success) {
            const downloadFile = () => {
                const link = document.createElement('a');
                link.href = 'data:text/plain;base64,' + data.content;
                link.download = `warp_llimonix_${randomNumber}.conf`;
                link.click();
            };

            button.innerHTML = `Скачать warp_llimonix_${randomNumber}.conf`;
            button.removeAttribute('onclick');
            button.addEventListener('click', downloadFile);
            downloadFile();
        } else {
            status.textContent = 'Ошибка: ' + data.message;
            button.innerHTML = 'Сгенерировать';
        }
    } catch (error) {
        status.textContent = 'Произошла ошибка при генерации.';
        button.innerHTML = 'Сгенерировать';
    } finally {
        button.disabled = false;
    }
}

document.getElementById('generateButton').onclick = generateConfig;

document.getElementById('telegramButton').onclick = function() {
    window.location.href = 'https://t.me/findllimonix';
}
document.getElementById('githubButton').onclick = function() {
    window.location.href = 'https://github.com/llimonix/warp-config-generator-vercel';
}