import { EditIcon } from './icon'
import { TaskDto } from "../../../dto/task";

export class EditTask {
    public editIcon: EditIcon;
    public element: HTMLElement;

    constructor(parsedItem: TaskDto) {
        let editIconContainer: HTMLDivElement = document.createElement('div');
        editIconContainer.classList.add('app-list-item__edit-icon-container');
        this.editIcon = new EditIcon(parsedItem);
        let icon: HTMLElement = this.editIcon.element;
        editIconContainer.appendChild(icon);

        this.element = editIconContainer;
    }
}
