import express = require('express');
import {IExtendedRequest} from "../Models";

/**
 * Роут получения времени работы сервера.
 *
 * @param {IExtendedRequest} req Объект запроса.
 * @param {express.Response} res Объект ответа.
 */
exports.status = (req: IExtendedRequest, res: express.Response) => {
    const {startDate} = req.data;
    const diffInSeconds: number = Math.floor((new Date().getTime() - startDate.getTime()) / 1000);
    const diffInMinutes: number = Math.floor(diffInSeconds / 60);

    // Время в формате 'HH:mm:ss'
    res.send(`${Math.floor(diffInMinutes / 60)}:${diffInMinutes % 60}:${diffInSeconds % 60}`);
};

/**
 * Роут для обработки всех неперехваченных соединений. Возвращает 404.
 *
 * @param {express.Responce} res Объект ответа.
 */
exports.notFound = (_, res: express.Response) => {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'text/html');
    res.write('<h1>Page not found</h1>');
    res.end();
};
