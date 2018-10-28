import express = require('express');
const api = require('./api');
const serviceRoutes = require('./serviceRoutes');

/**
 * Функция, задающая роуты.
 *
 * @param {express.Application} app Сервер.
 */
exports.setRoutes = (app: express.Application) => {
    app.get('/status', serviceRoutes.status);

    app.post('/api/events', api.events);

    app.all('*', serviceRoutes.notFound)
};
