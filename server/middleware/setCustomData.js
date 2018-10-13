/**
 * Метод, возвращающий мидлвару
 *
 * @param data Необходимые данные.
 */
module.exports = data => (req, res, next) => {
    req.data = {
        ...data
    };

    next();
};
