require('./index.css');
require('./assets');

const events = {
    "events": [
        {
            "type": "info",
            "title": "Еженедельный отчет по расходам ресурсов",
            "source": "Сенсоры потребления",
            "time": "19:00, Сегодня",
            "description": "Так держать! За последнюю неделю вы потратили на 10% меньше ресурсов, чем неделей ранее.",
            "icon": "stats",
            "data": {
                "type": "graph",
                "values": [
                    {
                        "electricity": [
                            ["1536883200", 115],
                            ["1536969600", 117],
                            ["1537056000", 117.2],
                            ["1537142400", 118],
                            ["1537228800", 120],
                            ["1537315200", 123],
                            ["1537401600", 129]
                        ]
                    },
                    {
                        "water": [
                            ["1536883200", 40],
                            ["1536969600", 40.2],
                            ["1537056000", 40.5],
                            ["1537142400", 41],
                            ["1537228800", 41.4],
                            ["1537315200", 41.9],
                            ["1537401600", 42.6]
                        ]
                    },
                    {
                        "gas": [
                            ["1536883200", 13],
                            ["1536969600", 13.2],
                            ["1537056000", 13.5],
                            ["1537142400", 13.7],
                            ["1537228800", 14],
                            ["1537315200", 14.2],
                            ["1537401600", 14.5]
                        ]
                    }
                ]
            },
            "size": "l"
        },
        {
            "type": "info",
            "title": "Дверь открыта",
            "source": "Сенсор входной двери",
            "time": "18:50, Сегодня",
            "description": null,
            "icon": "key",
            "size": "s"
        },
        {
            "type": "info",
            "title": "Уборка закончена",
            "source": "Пылесос",
            "time": "18:45, Сегодня",
            "description": null,
            "icon": "robot-cleaner",
            "size": "s"
        },
        {
            "type": "info",
            "title": "Новый пользователь",
            "source": "Роутер",
            "time": "18:45, Сегодня",
            "description": null,
            "icon": "router",
            "size": "s"
        },
        {
            "type": "info",
            "title": "Изменен климатический режим",
            "source": "Сенсор микроклимата",
            "time": "18:30, Сегодня",
            "description": "Установлен климатический режим «Фиджи»",
            "icon": "thermal",
            "size": "m",
            "data": {
                "temperature": 24,
                "humidity": 80
            }
        },
        {
            "type": "critical",
            "title": "Невозможно включить кондиционер",
            "source": "Кондиционер",
            "time": "18:21, Сегодня",
            "description": "В комнате открыто окно, закройте его и повторите попытку",
            "icon": "ac",
            "size": "m"
        },
        {
            "type": "info",
            "title": "Музыка включена",
            "source": "Яндекс.Станция",
            "time": "18:16, Сегодня",
            "description": "Сейчас проигрывается:",
            "icon": "music",
            "size": "m",
            "data": {
                "albumcover": "https://avatars.yandex.net/get-music-content/193823/1820a43e.a.5517056-1/m1000x1000",
                "artist": "Florence & The Machine",
                "track": {
                    "name": "Big God",
                    "length": "4:31"
                },
                "volume": 80
            }
        },
        {
            "type": "info",
            "title": "Заканчивается молоко",
            "source": "Холодильник",
            "time": "17:23, Сегодня",
            "description": "Кажется, в холодильнике заканчивается молоко. Вы хотите добавить его в список покупок?",
            "icon": "fridge",
            "size": "m",
            "data": {
                "buttons": ["Да", "Нет"]
            }
        },
        {
            "type": "info",
            "title": "Зарядка завершена",
            "source": "Оконный сенсор",
            "time": "16:22, Сегодня",
            "description": "Ура! Устройство «Оконный сенсор» снова в строю!",
            "icon": "battery",
            "size": "s"
        },
        {
            "type": "critical",
            "title": "Пылесос застрял",
            "source": "Сенсор движения",
            "time": "16:17, Сегодня",
            "description": "Робопылесос не смог сменить свое местоположение в течение последних 3 минут. Похоже, ему нужна помощь.",
            "icon": "cam",
            "data": {
                "image": "get_it_from_mocks.jpg"
            },
            "size": "l"
        },
        {
            "type": "info",
            "title": "Вода вскипела",
            "source": "Чайник",
            "time": "16:20, Сегодня",
            "description": null,
            "icon": "kettle",
            "size": "s"
        }
    ]
}
    .events;

const eventsContainer = document.querySelector('.events');
const template = document.querySelector<HTMLTemplateElement>('#event');
const graphTemplate = document.querySelector<HTMLTemplateElement>('#graph');
const buttonTemplate = document.querySelector<HTMLTemplateElement>('#button-template');
const climateTemplate = document.querySelector<HTMLTemplateElement>('#climate');
const camTemplate = document.querySelector<HTMLTemplateElement>('#cam');

const addGraph = (data, parent) => {
    const graph = <HTMLElement>graphTemplate.content.cloneNode(true);

    graph.querySelector('.graph__img').setAttribute('src', 'assets/graph.png');
    parent.parentElement.parentElement.classList.add('event_l-row');

    parent.appendChild(graph);
};

const addButtons = (labels, parent) => {
    labels.map((label, index) => {
        const button = <HTMLElement>buttonTemplate.content.cloneNode(true);
        const buttonElement = button.querySelector('.button');
        !index && buttonElement.classList.add('button_apply');
        buttonElement.textContent = label;

        parent.appendChild(buttonElement);
    });
};

const addClimate = (data, parent) => {
    const climate = <HTMLElement>climateTemplate.content.cloneNode(true);

    climate
        .querySelector('.climate__temperature')
        .querySelector('.climate__value')
        .textContent = data.temperature;
    climate
        .querySelector('.climate__humidity')
        .querySelector('.climate__value')
        .textContent = data.humidity;

    parent.appendChild(climate);
};

const addCam = (data, parent) => {
    const cam = <HTMLElement>camTemplate.content.cloneNode(true);

    const image = cam.querySelector('.cam__img');
    image.setAttribute('src', `assets/${data.image}`);
    image.setAttribute('touch-action', 'none');

    parent.parentElement.parentElement.classList.add('event_l-row');

    parent.appendChild(cam);
};

const addData = (data, parent) => {
    let type = data.type;

    if (data.temperature && data.humidity) {
        type = 'climate';
    }

    if (data.track) {
        type = 'music';
    }

    if (data.buttons) {
        type = 'buttons';
    }

    if (data.image) {
        type = 'image';
    }

    switch (type) {
        case 'graph':
            addGraph(data, parent);
            break;
        case 'climate':
            addClimate(data, parent);
            break;
        case 'buttons':
            addButtons(data.buttons, parent);
            break;
        case 'image':
            addCam(data, parent);
            break;
    }
};

events.forEach(event => {
    const {
        title,
        source,
        time,
        description,
        size,
        type,
        data,
        icon
    } = event;

    const eventTemplate = <HTMLElement>template.content.cloneNode(true);
    eventTemplate.querySelector('.event').classList.add(`event_${size}`);
    eventTemplate.querySelector('.event').classList.add(`event_${type}`);
    eventTemplate.querySelector('.event__icon').classList.add(`icon_${icon}`);
    eventTemplate.querySelector('.event__title').textContent = title;
    eventTemplate.querySelector('.event__source').textContent = source;
    eventTemplate.querySelector('.event__time').textContent = time;

    if (!description && !data) {
        eventTemplate.querySelector('.event__info').remove();
    } else {
        eventTemplate.querySelector('.event__description').textContent = description;

        data && addData(data, eventTemplate.querySelector('.event__data'));
    }

    eventsContainer.appendChild(eventTemplate);
});

class CamControl {
    touch = {};
    params = {
        translateX: 0,
        scale: 1,
        rotate: 0
    };
    element = null;
    img = null;

    constructor (query) {
        this.element = document.querySelector(query);
        this.img = this.element.querySelector('.cam__img');

        this.init();
        this.updateControls();
    }

    init () {
        this.bindEvents();
    }

    bindEvents () {
        this.img.addEventListener('pointerdown', e => this.onPointerDown(e));
        this.img.addEventListener('pointermove', e => this.onPointerMove(e));
        this.img.addEventListener('pointerup', e => this.onPointerUp());
        this.img.addEventListener('pointercancel', e => this.onPointerUp());
    }

    onPointerDown (e) {
        this.touch[e.pointerId] = {
            startX: e.x,
            startY: e.y,
            x: e.x,
            y: e.y
        };
    }

    onPointerMove (e) {
        this.touch[e.pointerId].x = e.x;
        this.touch[e.pointerId].y = e.y;

        this.detectAction();
    }

    onPointerUp () {
        this.touch = {};
    }

    detectAction () {
        const ids = Object.keys(this.touch);

        if (ids.length === 1) {
            const pointerParams = this.touch[ids[0]];
            const elementWidth = this.img.width;
            const parentWidth = this.img.parentElement.offsetWidth;
            const maxTranslate = (elementWidth * this.params.scale - parentWidth) / 2;

            this.params.translateX += pointerParams.x - pointerParams.startX;
            if (this.params.translateX < -maxTranslate) {
                this.params.translateX = -maxTranslate;
            }
            if (this.params.translateX > maxTranslate) {
                this.params.translateX = maxTranslate;
            }
        }

        if (ids.length === 2) {
            const firstPointer = this.touch[ids[0]];
            const secondPointer = this.touch[ids[1]];

            const originalDistance = Math.sqrt(
                Math.pow(firstPointer.startX - secondPointer.startX, 2) +
                Math.pow(firstPointer.startY - secondPointer.startY, 2)
            );
            const currentDistance = Math.sqrt(
                Math.pow(firstPointer.x - secondPointer.x, 2) +
                Math.pow(firstPointer.y - secondPointer.y, 2)
            );

            const originalDegree = Math.acos(
                Math.abs(secondPointer.startX - firstPointer.startX) /
                Math.sqrt(
                    Math.pow(secondPointer.startX - firstPointer.startX, 2) +
                    Math.pow(secondPointer.startY - firstPointer.startY, 2)
                )
            ) * 180;
            const currentDegree = Math.acos(
                Math.abs(secondPointer.x - firstPointer.x) /
                Math.sqrt(
                    Math.pow(secondPointer.x - firstPointer.x, 2) +
                    Math.pow(secondPointer.y - firstPointer.y, 2)
                )
            ) * 180;

            this.params.rotate = originalDegree - currentDegree;
            if (this.params.rotate < 0) {
                this.params.rotate = 0;
            }
            if (this.params.rotate > 90) {
                this.params.rotate = 90;
            }

            const translateRate = this.params.translateX / this.params.scale;
            this.params.scale = currentDistance / originalDistance;
            if (this.params.scale < 1) {
                this.params.scale = 1;
            }

            this.params.translateX = translateRate * this.params.scale;
        }

        this.updateCam();
    }

    updateCam () {
        const {translateX, scale, rotate} = this.params;

        this.img.style.transform = `translateX(${translateX}px) scale(${scale})`;
        this.img.style.opacity = (90 - rotate) / 90;

        this.updateControls();
    }

    updateControls () {
        const {scale, rotate} = this.params;
        const opacity = (90 - rotate) / 90;

        this.element.querySelector('.cam__scale').querySelector('.cam__control-value').textContent = `${Math.floor(scale * 100)}%`;
        this.element.querySelector('.cam__bright').querySelector('.cam__control-value').textContent = `${Math.floor(opacity * 100)}%`;
    }
}

new CamControl('.event__cam');

// Добавляем работу главного меню.
const menuToggle = () => {
    document.querySelector('.header__menu').classList.toggle('menu_hidden');
    document.querySelector('.paranja').classList.toggle('paranja_hidden');
};

document.querySelector('.header__mobile-menu').addEventListener('click', menuToggle);
document.querySelector('.paranja').addEventListener('click', menuToggle);