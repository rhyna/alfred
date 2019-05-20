export class PopupTextInput {
    public input: HTMLInputElement;
    public messageContainer: HTMLDivElement;

    constructor() {
        let textMessageContainer: HTMLDivElement = document.createElement('div');
        textMessageContainer.innerText = 'Введите текст';
        let textInput: HTMLInputElement = document.createElement('input');

        this.input = textInput;
        this.messageContainer = textMessageContainer;
    }
}
