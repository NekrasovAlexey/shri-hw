{
    const config = require('../config');

    /**
     * Метод обработки ошибок в приложении.
     */
    module.exports = (err, _, res, next) => {
        const {message, stack} = err;

        console.error(message, stack);

        if (config.env === 'development' || process.argv[3] === 'development') {
            res.status(500).json({
                message,
                stack
            });
        } else {
            res.status(500).send('Произошла ошибка. Мы уже работаем над этим.');
        }

        next();
    };
}
