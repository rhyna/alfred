import { CreateTransferIcon } from './transfer-icon'
import { TaskDto } from "../../../dto/task";

export class CreateTransferTask {
    public transferIcon: CreateTransferIcon;
    public element: HTMLDivElement;

    constructor(parsedItem: TaskDto) {
        this.transferIcon = new CreateTransferIcon(parsedItem);
        this.element = this.transferIcon.element;
    }
}
