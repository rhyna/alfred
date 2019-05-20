import { configuration } from "../config";

export class Api {
    public static makeListRequest(date: string): any {
        return fetch(`${configuration.apiUrl}?date=` + date, {
            method: 'GET',
            headers: {
                "Authorization": `Basic ${Api.getToken()}`
            },
        })
            .then(response => {
                if (response.status === 401) {
                    Api.requestLoginAndPass(() => {
                        Api.makeListRequest(date);
                    });
                } else {
                    return response.json();
                }
            });
    }

    public static makeEditTaskRequest(id: number, newContent: string): any {
        return fetch(configuration.apiUrl + id, {
            method: 'PATCH',
            headers: {
                "Authorization": `Basic ${Api.getToken()}`
            },
            body: JSON.stringify({
                content: newContent,
            }),
        })
            .then(response => {
                if (response.status === 401) {
                    Api.requestLoginAndPass(() => {
                        Api.makeEditTaskRequest(id, newContent);
                    });
                } else {
                    return response.json();
                }
            });
    }

    public static makeRemoveTaskRequest(id: number): any {
        return fetch(configuration.apiUrl + id, {
            method: 'DELETE',
            headers: {
                "Authorization": `Basic ${Api.getToken()}`
            }
        })
            .then(response => {
                if (response.status === 401) {
                    Api.requestLoginAndPass(() => {
                        Api.makeRemoveTaskRequest(id);
                    });
                } else {
                    return response.json();
                }
            })
    }

    public static makeCompleteTaskRequest(id: number): any {
        return fetch(configuration.apiUrl + id, {
            method: 'PATCH',
            headers: {
                "Authorization": `Basic ${Api.getToken()}`
            },
            body: JSON.stringify({
                completed: true,
            }),
        })
            .then(response => {
                if (response.status === 401) {
                    Api.requestLoginAndPass(() => {
                        Api.makeCompleteTaskRequest(id);
                    });
                } else {
                    return response.json();
                }
            })
    }


    public static addTaskRequest(task: string, date: string, time: string): any {
        return fetch(configuration.apiUrl, {
            method: 'POST',
            headers: {
                "Authorization": `Basic ${Api.getToken()}`
            },
            body: JSON.stringify({
                content: task,
                date: date,
                time: time,
            }),
        })
            .then(response => {
                if (response.status === 401) {
                    Api.requestLoginAndPass(() => {
                        Api.addTaskRequest(task, date, time);
                    });
                } else {
                    return response.json();
                }
            });
    }

    public static makeTransferTaskRequest(id: number, date: string, time: string): any {
        return fetch(configuration.apiUrl + id, {
            body: JSON.stringify({
                date: date,
                time: time
            }),
            method: 'PATCH',
            headers: {
                "Authorization": `Basic ${Api.getToken()}`
            },
        })
            .then(response => {
                if (response.status === 401) {
                    Api.requestLoginAndPass(() => {
                        Api.makeTransferTaskRequest(id, date, time);
                    });
                } else {
                    return response.json();
                }
            })
    }

    private static requestLoginAndPass(callback: Function): void {
        let login: string | null = prompt('login');
        let pass: string | null = prompt('pass');
        let token: string = window.btoa(`${login}:${pass}`);

        localStorage.setItem('token', token);

        alert('credentials are saved');

        if (callback) {
            callback();
        }
    }

    private static getToken(): string {
        return localStorage.getItem('token');
    }
}
