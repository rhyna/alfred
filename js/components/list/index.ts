import { Api } from '../../services/api'
import { ListItem } from './list-item/index'
import { TaskDto } from "../../dto/task";

export class List {
    public element: HTMLElement;

    constructor() {
        let listContainer: HTMLElement = document.createElement('div');
        listContainer.classList.add('app-list');

        this.element = listContainer;
    }

    public static loadList(): void {
        document.querySelector('.app-list').innerHTML = '';
        let dateInput: HTMLInputElement = document.querySelector('.app-date-input__input');
        Api.makeListRequest(dateInput.value).then(function (response: any) {
            if (response.length === 0) {
                document.querySelector('.app-list').innerHTML = 'Ничего не планировалось';
            } else {
                let listWithDto: TaskDto[] = response.map((item: { id: number; date: string; time: string; type: string; content: string; completed: boolean; }) => {
                    let dto: TaskDto = new TaskDto();

                    dto.id = item.id;
                    dto.date = item.date;
                    dto.time = item.time;
                    dto.type = item.type;
                    dto.content = item.content;
                    dto.completed = item.completed;

                    return dto;
                });

                let formattedList: HTMLElement[] = listWithDto.map(function (item) {
                    return new ListItem(item).element;
                });

                formattedList.forEach(function (div) {
                    document.querySelector('.app-list').appendChild(div);
                });
            }
        });
    }
}
