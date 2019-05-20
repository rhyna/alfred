import { Popup } from './index'

export class Cross {
    public element: HTMLDivElement;

    constructor() {
        let cross: HTMLDivElement = document.createElement('div');
        cross.classList.add('popup__cross');
        let crossIcon: HTMLElement = document.createElement('i');
        crossIcon.className = 'popup__cross-icon fa fa-times';
        cross.appendChild(crossIcon);
        cross.addEventListener('click', () => {
            Popup.closeAllPopups();
        });

        this.element = cross;
    }
}
