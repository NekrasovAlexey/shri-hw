import {UPDATE_EVENT} from './store';

/**
 * Метод инициализации приложения.
 *
 * @param {HTMLElement} renderChildren Внутренние элементы.
 * @param {HTMLElement} parent Родитель.
 */
export const init = (renderChildren: () => HTMLElement, parent: HTMLElement) => {
    const renderFunc = () => render(renderChildren, parent);

    document.addEventListener(UPDATE_EVENT, renderFunc);
    renderFunc();
};

/**
 * Метод рендеринга приложения.
 *
 * @param {HTMLElement} renderChildren Внутренние элементы.
 * @param {HTMLElement} parent Родитель.
 */
const render = (renderChildren: () => HTMLElement, parent: HTMLElement) => {
    parent.innerHTML = '';
    parent.appendChild(renderChildren());
};

