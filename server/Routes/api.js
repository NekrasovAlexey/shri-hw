const eventsJson = require('../../events.json');

/**
 * Допустимые типы событий.
 */
const allowedTypes = [
    'info',
    'critical'
];

/**
 * Роут получения данных по событиям.
 *
 * @param req Объект запроса.
 * @param res Объект ответа.
 */
exports.events = (req, res) => {
    const {body: {type}} = req;

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
