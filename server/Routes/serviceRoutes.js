/**
 * Роут получения времени работы сервера.
 *
 * @param req Объект запроса.
 * @param res Объект ответа.
 */
exports.status = (req, res) => {
    const {startDate} = req.data;
    const diffInSeconds = Math.floor((new Date() - startDate) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);

    // Время в формате 'HH:mm:ss'
    res.send(`${Math.floor(diffInMinutes / 60)}:${diffInMinutes % 60}:${diffInSeconds % 60}`);
};

/**
 * Роут для обработки всех неперехваченных соединений. Возвращает 404.
 *
 * @param res Объект ответа.
 */
exports.notFound = (_, res) => {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'text/html');
    res.write('<h1>Page not found</h1>');
    res.end();
};
