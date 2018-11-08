import express = require('express');
const eventsJson = require('../../../events.json');

/**
 * Типы событий.
 *
 * INFO - Информационное.
 * CRITICAL - Критичное.
 */
enum EEventTypes {
    INFO = 'info',
    CRITICAL = 'critical'
}

/**
 * Допустимые типы событий.
 */
const allowedTypes: EEventTypes[] = [
    EEventTypes.INFO,
    EEventTypes.CRITICAL
];

/**
 * Параметры запроса.
 *
 * @prop {EEventTypes} [type] Тип событий.
 */
interface IEventsRequestBody {
    type?: EEventTypes;
}

/**
 * Роут получения данных по событиям.
 *
 * @param {express.Request} req Объект запроса.
 * @param {express.Response} res Объект ответа.
 */
exports.events = (req: express.Request, res: express.Response) => {
    const body: IEventsRequestBody = req.body;
    const {type} = body;

    if (!type) {
        res.json(eventsJson);

    } else if (allowedTypes.includes(type)) {
        res.json({
            events: eventsJson.events.filter(event => event.type === type)
        });
    } else {
        res.status(400).send('incorrect type');
    }
};
