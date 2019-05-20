declare const flatpickr: any;


export class PopupDateInput {
    public messageContainer: HTMLDivElement;
    public input: HTMLInputElement;

    constructor(value: string) {
        let dateMessageContainer: HTMLDivElement = document.createElement('div');
        dateMessageContainer.innerText = 'Введите дату';
        let dateInput: HTMLInputElement = document.createElement('input');
        dateInput.value = value;

        this.input = dateInput;
        this.messageContainer = dateMessageContainer;
    }

    public init(): void {
        flatpickr(this.input, {
            enableTime: false,
            dateFormat: "d.m.Y",
            onKeyDown: function (selectedDates: any, dateStr: any, instance: any, e: any) {
                if (e.keyCode === 13) {
                    this.close();
                }
            }
        });
    }
}
