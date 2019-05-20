export class CreateDateInput {
    public input: HTMLInputElement;
    public messageContainer: HTMLDivElement;

    constructor() {
        let dateInput: HTMLInputElement = document.createElement('input');
        let dateHtmlInput: HTMLInputElement = document.querySelector('.app-date-input__input');
        dateInput.value = dateHtmlInput.value;
        let dateMessageContainer: HTMLDivElement = document.createElement('div');
        dateMessageContainer.innerText = 'Введите дату';

        this.input = dateInput;
        this.messageContainer = dateMessageContainer;
    }
}
