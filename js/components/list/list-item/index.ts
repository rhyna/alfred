import { EditTask } from '../edit/index';
import { DeleteTask } from '../delete/index';
import { CreateTransferTask } from '../transfer/index';
import { Checkbox } from '../checkbox/index';
import { TaskDto } from "../../../dto/task";

export class ListItem {
    public element: HTMLElement;

    constructor(parsedItem: TaskDto) {
        let listItem: HTMLDivElement = document.createElement('div');
        listItem.classList.add('app-list-item');

        const checkbox: Checkbox = new Checkbox(parsedItem);
        let checkboxContainer: HTMLDivElement = checkbox.element;
        listItem.appendChild(checkboxContainer);

        let timeContainer: HTMLDivElement = document.createElement('div');
        timeContainer.innerText = parsedItem.time;
        timeContainer.classList.add('app-list-item__time');
        listItem.appendChild(timeContainer);

        let textContainer: HTMLDivElement = document.createElement('div');
        textContainer.classList.add('app-list-item__text');
        listItem.appendChild(textContainer);

        let editTask: EditTask = new EditTask(parsedItem);

        textContainer.addEventListener('dblclick', function () {
            editTask.editIcon.iconClickListener(parsedItem);
        });

        let deleteTask: DeleteTask = new DeleteTask(parsedItem);
        let deleteIconContainer: HTMLDivElement = deleteTask.element;
        listItem.appendChild(deleteIconContainer);

        let createTransferTask: CreateTransferTask = new CreateTransferTask(parsedItem);
        let iconContainer: HTMLDivElement = createTransferTask.element;
        listItem.appendChild(iconContainer);

        textContainer.innerHTML = parsedItem.content;

        let formattedDate: Date = new Date(parsedItem.date);
        formattedDate.setHours(0);
        formattedDate.setMinutes(0);
        formattedDate.setSeconds(0);
        let currentDateElement: HTMLInputElement = document.querySelector('.app-date-input__input');
        let currentDate: string[] = currentDateElement.value.split('.');
        let currentFormattedDate: Date = new Date(`${currentDate[2]}-${currentDate[1]}-${currentDate[0]}`);
        currentFormattedDate.setHours(0);
        currentFormattedDate.setMinutes(0);
        currentFormattedDate.setSeconds(0);

        if (parsedItem.completed) {
            textContainer.classList.add('app-list-item__text--completed');
        } else if (formattedDate < currentFormattedDate) {
            textContainer.classList.add('app-list-item__text--overdue');
        }

        this.element = listItem;
    }
}
