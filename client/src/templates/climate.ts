import {IClimateData} from "../Models";

const climateTemplate: HTMLTemplateElement = document.querySelector<HTMLTemplateElement>('#climate');

/**
 * Функция, добавляющая информацию о климате.
 *
 * @param {IClimateData} data Данные о климате.
 * @param {HTMLElement} parent Элемент, к которому добавляются данные.
 */
export const addClimate = (data: IClimateData, parent: HTMLElement) => {
    const climate: HTMLElement = <HTMLElement>climateTemplate.content.cloneNode(true);

    climate
        .querySelector('.climate__temperature')
        .querySelector('.climate__value')
        .textContent = data.temperature.toString();
    climate
        .querySelector('.climate__humidity')
        .querySelector('.climate__value')
        .textContent = data.humidity.toString();

    parent.appendChild(climate);
};