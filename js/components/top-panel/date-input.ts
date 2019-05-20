import { List } from '../list/index'

declare const flatpickr: any;

export function createDateInput(parent: HTMLElement): HTMLInputElement {
    let dateInputContainer: HTMLDivElement = document.createElement('div');
    dateInputContainer.classList.add('app-date-input');
    let dateInput: HTMLInputElement = document.createElement('input');
    dateInput.classList.add('app-date-input__input');
    parent.appendChild(dateInputContainer);
    dateInputContainer.appendChild(dateInput);
    dateInput.value = getCurrentDate();

    flatpickr(dateInput, {
        enableTime: false,
        dateFormat: "d.m.Y"
    });
    dateInput.addEventListener('change', function () {
        List.loadList();
    });

    return dateInput;
}

function getCurrentDate(): string {
    let dateObj: Date = new Date();
    let day: string = String(dateObj.getDate());
    if (+day < 10) {
        day = '0' + day;
    }
    let month: string = String(dateObj.getMonth() + 1);
    if (+month < 10) {
        month = '0' + month;
    }
    let year: number = dateObj.getFullYear();

    return day + '.' + month + '.' + year;
}
