const api = require('./api');
const serviceRoutes = require('./serviceRoutes');

/**
 * Функция, задающая роуты.
 *
 * @param app Сервер.
 */
exports.setRoutes = app => {
    app.get('/status', serviceRoutes.status);

    app.post('/api/events', api.events);

    app.all('*', serviceRoutes.notFound)
};
