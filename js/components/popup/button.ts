export class PopupButton {
    public element: HTMLButtonElement;

    constructor(sendData: () => void) {
        let button: HTMLButtonElement = document.createElement('button');
        button.innerText = 'Отправить';
        button.addEventListener('click', sendData);

        this.element = button;
    }
}
