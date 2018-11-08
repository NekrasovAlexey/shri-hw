/**
 * Стор.
 */
let store;

/**
 * Тип обработчика, изменяющего стор.
 */
type TReducer = (store, action) => object;

/**
 * Обработчики, изменяющие текущий стор.
 */
const reducers: {[action: string]: TReducer[]} = {};

/**
 * Функция для глубокого клонирования объекта.
 * (С учетом специфики стора в разрезе именно стора. Зато не тянуть лишнюю либу)
 *
 * @param {object} item Клонируемый элемент.
 */
const cloneDeep = (item: object) => {
    const clone = {};

    for (let prop in item) {
        const value = item[prop];
        clone[prop] = typeof value === 'object' ? cloneDeep(value) : value;
    }

    return clone;
};

/**
 * Функция инициализации стора.
 *
 * @param {object} initialState Начальное состояние стора.
 */
export const initStore = (initialState: object) => {
    if (store || Object.prototype.toString.call(initialState) !== '[object Object]') {
        return;
    }

    store = initialState || {};
};

/**
 * Функция, возвращающая текущий стор.
 */
export const getStore = (): any => cloneDeep(store);

/**
 * Функция добавления обработчика, изменяющего стор, на событие.
 *
 * @param {string} action Событие.
 * @param {TReducer} reducer Обработчик.
 */
export const addReducer = (action: string, reducer: TReducer) => {
    if (!reducers[action]) {
        reducers[action] = [];
    }

    reducers[action].push(reducer);
};

/**
 * Событие обновления стора.
 */
export const UPDATE_EVENT = 'StoreUpdateEvent';

/**
 * Событие для запуска обновления стора.
 */
const DISPATCH_EVENT = 'StoreDispatchEvent';

/**
 * Обработчик событий.
 *
 * @param {CustomEvent} e Событие.
 */
const handleDispatchEvent = (e: CustomEvent) => {
    const action: IAction = e.detail;

    // Если на текущее событие есть обработчики, изменяющие стор.
    const actionReducers = reducers[action.action];
    if (actionReducers) {
        // Вызываем их.
        actionReducers.forEach(reducer => store = reducer(store, action));

        // И уведомляем об обновлении стора.
        const event = new CustomEvent(UPDATE_EVENT);
        document.dispatchEvent(event);
    }
};

/**
 * Подписываем стор на события.
 */
document.addEventListener(DISPATCH_EVENT, handleDispatchEvent);

/**
 * Событие.
 *
 * @prop {string} action Тип события.
 * @prop {any} [payload] Данные события.
 */
export interface IAction {
    action: string;
    payload?: any;
}

/**
 * Функция, инициализирующая событие.
 *
 * @param {IAction} action Событие.
 */
export const dispatchEvent = (action: IAction) => {
    const event = new CustomEvent(DISPATCH_EVENT, {
        detail: action
    });

    document.dispatchEvent(event);
};