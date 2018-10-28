import express = require('express');

/**
 * Метод обработки ошибок в приложении.
 */
module.exports = (err: Error, _, res: express.Response, next: express.NextFunction) => {
    const {message, stack} = err;

    console.error(message, stack);

    if (process.argv[3] === 'development') {
        res.status(500).json({
            message,
            stack
        });
    } else {
        res.status(500).send('Произошла ошибка. Мы уже работаем над этим.');
    }

    next();
};
