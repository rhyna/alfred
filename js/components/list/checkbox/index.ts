import { CheckboxInput } from "./input";
import { TaskDto } from "../../../dto/task";

export class Checkbox {
    public element: HTMLDivElement;

    constructor(parsedItem: TaskDto) {
        let checkboxContainer: HTMLDivElement = document.createElement('div');
        checkboxContainer.classList.add('app-list-item__checkbox');
        let checkboxInput: CheckboxInput = new CheckboxInput(parsedItem);
        checkboxContainer.appendChild(checkboxInput.element);

        this.element = checkboxContainer;
    }
}
