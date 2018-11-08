const graphTemplate: HTMLTemplateElement = document.querySelector<HTMLTemplateElement>('#graph');

/**
 * Функция добавления графика.
 *
 * @param {HTMLElement} parent Родительский элемент, к которому добавляется график.
 */
export const addGraph = (parent: HTMLElement) => {
    const graph = <HTMLElement>graphTemplate.content.cloneNode(true);

    graph.querySelector('.graph__img').setAttribute('src', 'assets/graph.png');
    parent.parentElement.parentElement.classList.add('event_l-row');

    parent.appendChild(graph);
};