/**
 * Данные о климате.
 *
 * @prop {number} temperature Температура.
 * @prop {number} humidity Влажность.
 */
export interface IClimateData {
    temperature: number;
    humidity: number;
}

/**
 * Данные камеры.
 *
 * @prop {string} image Отображаемая картинка.
 */
export interface ICamData {
    image: string;
}
