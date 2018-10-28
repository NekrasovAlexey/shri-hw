const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const errorCatcher = require('./middleware/errorCatcher');
const setCustomData = require('./middleware/setCustomData');
const setRoutes = require('./Routes').setRoutes;

const data = {
    startDate: null
};

const app = express();

/**
 * Парсим переданные json данные.
 */
app.use(bodyParser.json());

/**
 * Сохраняем время старта сервера.
 */
app.use(setCustomData(data));

/**
 * Задаем роуты.
 */
setRoutes(app);

/**
 * Перехватываем ошибки.
 */
app.use(errorCatcher);

const port = process.argv[2] ? Number(process.argv[2]) : config.port;

app.listen(port, error => {
    if (error) {
        return console.log('Произошла ошибка', error);
    }

    data.startDate = new Date();
    console.log(`Сервер запущен на ${port}`);
});
