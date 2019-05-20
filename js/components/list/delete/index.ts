import { DeleteTaskIcon } from "./icon";
import { TaskDto } from "../../../dto/task";

export class DeleteTask {
    public element: HTMLDivElement;

    constructor(parsedItem: TaskDto) {
        let deleteIconContainer: HTMLDivElement = document.createElement('div');
        deleteIconContainer.classList.add('app-list-item__delete-icon-container');

        let deleteTaskIcon: DeleteTaskIcon = new DeleteTaskIcon(parsedItem);
        let icon: HTMLElement = deleteTaskIcon.element;
        deleteIconContainer.appendChild(icon);

        this.element = deleteIconContainer;
    }
}
