declare const flatpickr: any;

export class PopupTimeInput {
    public input: HTMLInputElement;
    public messageContainer: HTMLDivElement;

    constructor() {
        let timeMessageContainer: HTMLDivElement = document.createElement('div');
        timeMessageContainer.innerText = 'Введите время';
        this.input = document.createElement('input');
        this.messageContainer = timeMessageContainer;
        let currentTime: string = new Date().getHours() + ':' + '00';
        this.input.value = currentTime;
    }

    public init(): void {
        flatpickr(this.input, {
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
            time_24hr: true,
            onKeyDown: function (selectedDates: any, dateStr: any, instance: any, e: { keyCode: number; }) {
                if (e.keyCode === 13) {
                    this.close();
                }
            }
        });
    }
}
