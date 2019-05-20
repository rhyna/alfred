import { Cross } from './popup-cross'

declare const $: any;

export class Popup {
    constructor(inner: HTMLDivElement) {
        let popup: HTMLDivElement = document.createElement('div');
        popup.classList.add('popup');

        popup.appendChild(inner);
        let popupCross: Cross = new Cross();
        popup.appendChild(popupCross.element);

        let popupUnderLayer: HTMLDivElement = document.createElement('div');
        popupUnderLayer.classList.add('popup-under-layer');
        popupUnderLayer.addEventListener('click', () => {
            this.closePopup();
        });

        document.querySelector('.app').appendChild(popupUnderLayer);
        document.querySelector('.app').appendChild(popup);

        this.setInputFocus();

        document.addEventListener('keydown', (e) => {
            if (e.keyCode === 27) {
                this.closePopup();
            }
        });
    }

    private closePopup(): void {
        let popup: HTMLElement = document.querySelector('.popup');
        let popupUnderLayer: HTMLElement = document.querySelector('.popup-under-layer');

        if (popup && popupUnderLayer) {
            popupUnderLayer.remove();
            popup.remove();
        }
    }

    public static closeAllPopups(): void {
        $('.popup').remove();
        $('.popup-under-layer').remove();
    }

    private setInputFocus(): void {
        let popup: HTMLElement = document.querySelector('.popup');
        let popupInputs: NodeListOf<HTMLElement> = popup.querySelectorAll('input');
        popupInputs[0].focus();
    }
}
