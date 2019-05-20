import { Api } from '../../../services/api'
import { Popup } from '../../popup/index'
import { List } from '../index'
import { TaskDto } from "../../../dto/task";

export class EditIcon {
    public element: HTMLElement;

    constructor(parsedItem: TaskDto) {
        let editIcon: HTMLElement = document.createElement('i');
        editIcon.classList.add('app-list-item__edit-icon');
        editIcon.classList.add('fa');
        editIcon.classList.add('fa-pencil');

        editIcon.addEventListener('click', () => {
            this.iconClickListener(parsedItem);
        });

        this.element = editIcon;
    }

    public iconClickListener(parsedItem: TaskDto): void {
        this.createEditTaskPopupContainer(parsedItem);
    }

    private createEditTaskPopupContainer(parsedItem: TaskDto): void {
        let container: HTMLDivElement = document.createElement('div');
        let messageContainer: HTMLDivElement = this.createMessageContainer();
        container.appendChild(messageContainer);
        let input: HTMLInputElement = this.createInput(parsedItem);
        container.appendChild(input);
        let button: HTMLButtonElement = this.createButton(input, parsedItem);
        container.appendChild(button);
        new Popup(container);
    }

    private createMessageContainer(): HTMLDivElement {
        let messageContainer: HTMLDivElement = document.createElement('div');
        messageContainer.innerText = 'Введите новый текст';

        return messageContainer;
    }

    private createInput(parsedItem: TaskDto): HTMLInputElement {
        let input: HTMLInputElement = document.createElement('input');
        input.value = parsedItem.content;

        return input;
    }

    private createButton(input: HTMLInputElement, parsedItem: TaskDto): HTMLButtonElement {
        let button: HTMLButtonElement = document.createElement('button');
        button.innerText = 'Отправить';

        button.addEventListener('click', () => {
            this.sendData(input, parsedItem);
        });
        document.addEventListener('keydown', (e) => {
            if (e.keyCode === 13 && e.target === input) {
                this.sendData(input, parsedItem);
            }
        });

        return button;
    }

    private sendData(input: HTMLInputElement, parsedItem: TaskDto): void {
        let id: number = parsedItem.id;
        let newText: string = input.value;
        Api.makeEditTaskRequest(id, newText).then(function (response: any) {
            Popup.closeAllPopups();
            List.loadList();
        })
    }
}
