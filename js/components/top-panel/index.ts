import { createDateInput } from "./date-input";
import { AddIcon } from './add-icon'

export class TopPanel {
    public dateInput: HTMLInputElement;
    public addIcon: AddIcon;
    public element: HTMLDivElement;

    constructor() {
        let topPanel: HTMLDivElement = document.createElement('div');
        topPanel.classList.add('app-top-panel');
        this.dateInput = createDateInput(topPanel);

        this.addIcon = new AddIcon();
        topPanel.appendChild(this.addIcon.element);

        this.element = topPanel;
    }
}
