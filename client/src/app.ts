import * as Lib from '../lib';

/**
 * Список элементов меню.
 */
enum EMenuItem {
    EVENTS = 'events',
    CAM = 'cam'
}

const menuItems = [
    {
        name: EMenuItem.EVENTS,
        label: 'События'
    },
    {
        name: EMenuItem.CAM,
        label: 'Видеонаблюдение'
    }
];

const localStore = localStorage.getItem('store');
const initialStore = localStore ?
    JSON.parse(localStore) :
    {
        activeMenuItem: EMenuItem.EVENTS
    };

// Инициализируем стор.
Lib.initStore(initialStore);

/**
 * Название события изменения текущего раздела.
 */
const CHANGE_ACTIVE_MENU_ITEM_ACTION = 'CHANGE_ACTIVE_MENU_ITEM_ACTION';

// Добавляю редюсер на событие изменения раздела.
Lib.addReducer(CHANGE_ACTIVE_MENU_ITEM_ACTION, (store, action) => ({
    activeMenuItem: action.payload
}));

// Нужна мемоизация
const handleChangeActiveMenuItemFactory = name => e => {
    e.preventDefault();

    Lib.dispatchEvent({
        action: CHANGE_ACTIVE_MENU_ITEM_ACTION,
        payload: name
    });

    localStorage.setItem('store', JSON.stringify(Lib.getStore()));
};

// Функция рендера меню.
const renderMenu = () => {
    const {activeMenuItem} = Lib.getStore();

    const menuItemWrapper = document.createElement('div');

    menuItems.forEach(({name, label}) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('menu__item');
        if (activeMenuItem === name) {
            itemElement.classList.add('menu__item_active');
        }

        const link = document.createElement('a');
        link.classList.add('menu__link');
        link.textContent = label;
        link.addEventListener('click', handleChangeActiveMenuItemFactory(name));
        itemElement.appendChild(link);

        menuItemWrapper.appendChild(itemElement);
    });

    return menuItemWrapper;
};

export const createApp = () => Lib.render(
    renderMenu,
    document.querySelector('.header__menu')
);
