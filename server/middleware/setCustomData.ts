import express = require('express');
import {ICustomData, IExtendedRequest} from '../Models';

/**
 * Метод, возвращающий мидлвару, обогащающую объект запроса произвольными данными.
 *
 * @param data Необходимые данные.
 */
module.exports = (data: ICustomData) =>
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
        (req as IExtendedRequest).data = {
            ...data
        };

        next();
    };
