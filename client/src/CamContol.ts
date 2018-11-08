interface ITouchEvent {
    startX: number;
    startY: number;
    x: number;
    y: number;
}

interface ITouchEvents {
    [pointerId: number]: ITouchEvent;
}

/**
 * Параметры управления камерой.
 *
 * @prop {number} translateX Сдвиг по оси Х.
 * @prop {number} scale Масштаб.
 * @prop {number} rotate Поворот.
 */
interface ICamControlParams {
    translateX: number;
    scale: number;
    rotate: number;
}

export class CamControl {
    touch: ITouchEvents = {};
    params: ICamControlParams = {
        translateX: 0,
        scale: 1,
        rotate: 0
    };
    element: HTMLElement | null = null;
    img: HTMLElement | null = null;

    /**
     * @param {HTMLElement} element Элемент, к которому добавляется функционал управления камерой.
     */
    constructor (element: HTMLElement) {
        this.element = element;
        this.img = this.element.querySelector('.cam__img');

        this.init();
        this.updateControls();
    }

    init () {
        this.bindEvents();
    }

    bindEvents () {
        this.img.addEventListener('pointerdown', (e: PointerEvent) => this.onPointerDown(e));
        this.img.addEventListener('pointermove', (e: PointerEvent) => this.onPointerMove(e));
        this.img.addEventListener('pointerup', () => this.onPointerUp());
        this.img.addEventListener('pointercancel', () => this.onPointerUp());
    }

    onPointerDown (e: PointerEvent) {
        this.touch[e.pointerId] = {
            startX: e.x,
            startY: e.y,
            x: e.x,
            y: e.y
        };
    }

    onPointerMove (e: PointerEvent) {
        this.touch[e.pointerId].x = e.x;
        this.touch[e.pointerId].y = e.y;

        this.detectAction();
    }

    onPointerUp () {
        this.touch = {};
    }

    detectAction () {
        const ids: string[] = Object.keys(this.touch);

        // Если одно касание, то это поворот.
        if (ids.length === 1) {
            const pointerParams: ITouchEvent = this.touch[ids[0]];
            const elementWidth: number = this.img.offsetWidth;
            const parentWidth: number = this.img.parentElement.offsetWidth;
            const maxTranslate: number = (elementWidth * this.params.scale - parentWidth) / 2;

            this.params.translateX += pointerParams.x - pointerParams.startX;
            if (this.params.translateX < -maxTranslate) {
                this.params.translateX = -maxTranslate;
            }
            if (this.params.translateX > maxTranslate) {
                this.params.translateX = maxTranslate;
            }
        }

        // Если два касания, то распознаем масштаб и поворот.
        if (ids.length === 2) {
            const firstPointer: ITouchEvent = this.touch[ids[0]];
            const secondPointer: ITouchEvent = this.touch[ids[1]];

            const originalDistance: number = Math.sqrt(
                Math.pow(firstPointer.startX - secondPointer.startX, 2) +
                Math.pow(firstPointer.startY - secondPointer.startY, 2)
            );
            const currentDistance: number = Math.sqrt(
                Math.pow(firstPointer.x - secondPointer.x, 2) +
                Math.pow(firstPointer.y - secondPointer.y, 2)
            );

            const originalDegree: number = Math.acos(
                Math.abs(secondPointer.startX - firstPointer.startX) /
                Math.sqrt(
                    Math.pow(secondPointer.startX - firstPointer.startX, 2) +
                    Math.pow(secondPointer.startY - firstPointer.startY, 2)
                )
            ) * 180;
            const currentDegree: number = Math.acos(
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

            const translateRate: number = this.params.translateX / this.params.scale;
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
        this.img.style.opacity = ((90 - rotate) / 90).toString();

        this.updateControls();
    }

    updateControls () {
        const {scale, rotate} = this.params;
        const opacity: number = (90 - rotate) / 90;

        this.element.querySelector('.cam__scale').querySelector('.cam__control-value').textContent = `${Math.floor(scale * 100)}%`;
        this.element.querySelector('.cam__bright').querySelector('.cam__control-value').textContent = `${Math.floor(opacity * 100)}%`;
    }
}
