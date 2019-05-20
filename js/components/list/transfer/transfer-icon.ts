import { Popup } from '../../popup/index'
import { Api } from '../../../services/api'
import { List } from '../index'
import { CreateDateInput } from './date-input'
import { CreateTimeInput } from './time-input'
import { CreateButton } from './button'
import { TaskDto } from "../../../dto/task";

declare const flatpickr: any;

export class CreateTransferIcon {
    private parsedItem: TaskDto;
    public element: HTMLDivElement;

    constructor(parsedItem: TaskDto) {
        this.parsedItem = parsedItem;
        let transferIconContainer: HTMLDivElement = document.createElement('div');
        transferIconContainer.classList.add('app-list-item__transfer-icon-container');
        let transferIcon: HTMLElement = document.createElement('i');
        transferIcon.className = 'app-list-item__transfer-icon fa fa-arrow-right';
        transferIconContainer.appendChild(transferIcon);
        transferIcon.addEventListener('click', () => {
            this.transferIconClickHandler();
        });

        this.element = transferIconContainer;
    }

    public transferIconClickHandler(): void {
        let container: HTMLDivElement = document.createElement('div');
        let dateInput: HTMLInputElement = this.appendDateInput(container);
        let timeInput: HTMLInputElement = this.appendTimeInput(container, this.parsedItem);

        document.addEventListener('keydown', (e) => {
            if (e.keyCode === 13 && e.target === (dateInput || e.target === timeInput)) {
                this.sendData(dateInput, timeInput, this.parsedItem);
            }
        });

        this.appendButton(dateInput, timeInput, this.parsedItem, container);

        flatpickr(dateInput, {
            enableTime: false,
            dateFormat: "d.m.Y",
            onKeyDown: function (selectedDates: any, dateStr: any, instance: any, e: { keyCode: number; }) {
                if (e.keyCode === 13) {
                    this.close();
                }
            }
        });

        flatpickr(timeInput, {
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
            time_24hr: true,
            onKeyDown: function (selectedDates: any, dateStr: any, instance: any, e: { keyCode: number; }) {
                if (e.keyCode === 13) {
                    this.close();
                }
            }
        });

        new Popup(container);
    }

    private sendData(dateInput: HTMLInputElement, timeInput: HTMLInputElement, parsedItem: { id: number; }): void {
        let date: string = dateInput.value;
        let time: string = timeInput.value;
        let id: number = parsedItem.id;

        Api.makeTransferTaskRequest(id, date, time).then((response: any) => {
            Popup.closeAllPopups();
            List.loadList();
        })
    }

    private appendDateInput(container: HTMLDivElement): HTMLInputElement {
        let createDateInput: CreateDateInput = new CreateDateInput();
        let dateInput: HTMLInputElement = createDateInput.input;
        let dateMessageContainer: HTMLDivElement = createDateInput.messageContainer;
        container.appendChild(dateMessageContainer);
        container.appendChild(dateInput);

        return dateInput;
    }

    private appendTimeInput(container: HTMLDivElement, parsedItem: { time: string; }): HTMLInputElement {
        let createTimeInput: CreateTimeInput = new CreateTimeInput(parsedItem);
        let timeInput: HTMLInputElement = createTimeInput.input;
        let timeMessageContainer: HTMLDivElement = createTimeInput.messageContainer;
        container.appendChild(timeMessageContainer);
        container.appendChild(timeInput);

        return timeInput;
    }

    private appendButton(dateInput: HTMLInputElement, timeInput: HTMLInputElement, parsedItem: { id: number; }, container: HTMLDivElement): void {
        let createButton: CreateButton = new CreateButton(() => {
            this.sendData(dateInput, timeInput, parsedItem);
        });
        let button: HTMLButtonElement = createButton.element;
        container.appendChild(button);
    }
}

