export class CreateButton {
    public element: HTMLButtonElement;

    constructor(onClick: { (): void; (this: HTMLButtonElement, ev: MouseEvent): any; }) {
        let button: HTMLButtonElement = document.createElement('button');
        button.innerText = 'Отправить';
        button.addEventListener('click', onClick);
        this.element = button;
    }
}
