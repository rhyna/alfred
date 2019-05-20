import { Api } from '../../services/api'
import { Popup } from '../popup/index'
import { List } from '../list/index'
import { PopupDateInput } from '../popup/date-input'
import { PopupTimeInput } from '../popup/time-input'
import { PopupTextInput } from '../popup/text-input'
import { PopupButton } from '../popup/button'

export class AddIcon {
    public element: HTMLDivElement;

    constructor() {
        let addIconContainer: HTMLDivElement = document.createElement('div');
        addIconContainer.classList.add('app-add-icon-container');

        let addIcon: HTMLElement = document.createElement('i');
        addIcon.className = 'app-add-icon fa fa-plus';
        addIconContainer.appendChild(addIcon);

        addIcon.addEventListener('click', () => {
            this.addIconClickHandler();
        });

        this.element = addIconContainer;
    }

    public addIconClickHandler(): void {
        let defaultDateInput: HTMLInputElement = document.querySelector('.app-date-input__input');
        let defaultDateValue: string = defaultDateInput.value;
        let container: HTMLDivElement = document.createElement('div');

        let input: HTMLInputElement = this.appendTextInput(container);
        let dateInput: HTMLInputElement = this.appendDateInput(container, defaultDateValue);
        let timeInput: HTMLInputElement = this.appendTimeInput(container);

        let popupButton: PopupButton = new PopupButton(() => {
            this.sendData(input, dateInput, timeInput);
        });
        container.appendChild(popupButton.element);

        document.addEventListener('keydown', (e) => {
            if (e.keyCode === 13 && (e.target === input || e.target === dateInput || e.target === timeInput)) {
                this.sendData(input, dateInput, timeInput);
            }
        });

        new Popup(container);
    }

    private appendTextInput(container: HTMLDivElement): HTMLInputElement {
        let input: PopupTextInput = new PopupTextInput();
        let inputElement: HTMLInputElement = input.input;
        container.appendChild(input.messageContainer);
        container.appendChild(inputElement);

        return inputElement;
    }

    private appendDateInput(container: HTMLDivElement, defaultDateValue: string): HTMLInputElement {
        let dateInput: PopupDateInput = new PopupDateInput(defaultDateValue);
        let dateInputElement: HTMLInputElement = dateInput.input;
        container.appendChild(dateInput.messageContainer);
        container.appendChild(dateInputElement);

        dateInput.init();

        return dateInputElement;
    }

    private appendTimeInput(container: HTMLDivElement): HTMLInputElement {
        let timeInput: PopupTimeInput = new PopupTimeInput();
        let timeInputElement: HTMLInputElement = timeInput.input;
        container.appendChild(timeInput.messageContainer);
        container.appendChild(timeInputElement);

        timeInput.init();

        return timeInputElement;
    }

    private sendData(input: HTMLInputElement, dateInput: HTMLInputElement, timeInput: HTMLInputElement): void {
        let task: string = input.value;
        let date: string = dateInput.value;
        let time: string = timeInput.value;
        Api.addTaskRequest(task, date, time).then(function (response: any) {
            Popup.closeAllPopups();
            List.loadList();
        });
    }
}
