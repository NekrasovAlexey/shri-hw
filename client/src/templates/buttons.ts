const buttonTemplate: HTMLTemplateElement = document.querySelector<HTMLTemplateElement>('#button-template');

/**
 * Функция, добавляющая кнопки к элементу.
 *
 * @param {string[]} labels Список лейблов кнопок.
 * @param {HTMLElement} parent Элемент, к которому добавляются кнопки.
 */
export const addButtons = (labels: string[], parent: HTMLElement) => {
    labels.map((label, index) => {
        const button: HTMLElement = <HTMLElement>buttonTemplate.content.cloneNode(true);

        const buttonElement: HTMLElement = button.querySelector('.button');
        !index && buttonElement.classList.add('button_apply');
        buttonElement.textContent = label;

        parent.appendChild(buttonElement);
    });
};