import { Api } from '../../../services/api'
import { List } from '../index'
import { TaskDto } from "../../../dto/task";

export class DeleteTaskIcon {
    public element: HTMLElement;

    constructor(parsedItem: TaskDto) {
        let deleteIcon: HTMLElement = document.createElement('i');
        deleteIcon.classList.add('app-list-item__delete-icon');
        deleteIcon.classList.add('fa');
        deleteIcon.classList.add('fa-trash');
        deleteIcon.addEventListener('click', function () {
            let answer: boolean = confirm('Уверены?');

            if (answer === true) {
                Api.makeRemoveTaskRequest(parsedItem.id).then(() => {
                    List.loadList();
                })
            }
        });

        this.element = deleteIcon;
    }
}
