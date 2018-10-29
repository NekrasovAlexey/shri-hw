import {ICamData} from "../Models";

const camTemplate:HTMLTemplateElement = document.querySelector<HTMLTemplateElement>('#cam');

/**
 * Функция, добавляющая камеру к элементу.
 *
 * @param {ICamData} data Данные камеры.
 * @param {HTMLElement} parent Элемент, к которому добавляется камера.
 */
export const addCam = (data: ICamData, parent: HTMLElement) => {
    const cam: HTMLElement = <HTMLElement>camTemplate.content.cloneNode(true);

    const image: HTMLElement = cam.querySelector('.cam__img');
    image.setAttribute('src', `assets/${data.image}`);
    image.setAttribute('touch-action', 'none');

    parent.parentElement.parentElement.classList.add('event_l-row');

    parent.appendChild(cam);
};