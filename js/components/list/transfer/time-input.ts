export class CreateTimeInput {
    public messageContainer: HTMLDivElement;
    public input: HTMLInputElement;

    constructor(parsedItem: { time: string; }) {
        let timeInput: HTMLInputElement = document.createElement('input');
        timeInput.value = parsedItem.time;
        let timeMessageContainer: HTMLDivElement = document.createElement('div');
        timeMessageContainer.innerText = 'Введите время';

        this.messageContainer = timeMessageContainer;
        this.input = timeInput;
    }
}
