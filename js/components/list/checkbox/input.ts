import { Api } from '../../../services/api'
import { TaskDto } from "../../../dto/task";

export class CheckboxInput {
    public element: HTMLInputElement;

    constructor(parsedItem: TaskDto) {
        this.element = this.createInput(parsedItem);
    }

    private createInput(parsedItem: TaskDto): HTMLInputElement {
        let checkboxInput: HTMLInputElement = document.createElement('input');

        checkboxInput.type = 'checkbox';
        checkboxInput.checked = parsedItem.completed;

        this.addCheckBoxChangeListener(checkboxInput, parsedItem);

        return checkboxInput;
    }

    private addCheckBoxChangeListener(checkboxInput: HTMLInputElement, parsedItem: TaskDto): void {
        checkboxInput.addEventListener('change', function (e: any) {
            if (e.target.checked) {
                let textContainer: HTMLElement = e.target.closest('.app-list-item').querySelector('.app-list-item__text');
                textContainer.classList.add('app-list-item__text--completed');
                Api.makeCompleteTaskRequest(parsedItem.id);
            } else {
                e.target.checked = true;
            }
        });
    }
}
