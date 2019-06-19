import { Injectable, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ErrorService {
    private messageSource = new BehaviorSubject<string>('');
    currentMessage = this.messageSource.asObservable();

    constructor() { }
    changeMessage(message: string) {
        this.messageSource.next(message);
    }

}
