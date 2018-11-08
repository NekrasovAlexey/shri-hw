import express = require('express');

/**
 * Произвольные данные для передачи внутри приложения с запросов пользователя.
 *
 * @prop {Date | null} startDate Время запуска сервера.
 */
export interface ICustomData {
    startDate: Date | null;
}

export interface IExtendedRequest extends express.Request {
    data: ICustomData;
}