
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Contact } from '../interface/contact.model';
import { ContactsService } from './contacts.service';
import { BehaviorSubject } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginationPropertySort } from '../interface/pagination';
import { ErrorHandlerService } from './error-handler.service';

export class ContactsDataSource implements DataSource<Contact> {

    private contactsSubject = new BehaviorSubject<Contact[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    public total = 0;

    constructor(private contactsService: ContactsService,
        private errorService: ErrorHandlerService) {

    }

    loadContacts(
        filter: string,
        sortProperty: string,
        sortDirection: string,
        pageIndex: number,
        pageSize: number) {

        this.loadingSubject.next(true);

        const sort = new PaginationPropertySort();
        sort.property = sortProperty;
        sort.direction = sortDirection;

        this.contactsService.findContactsWithSortAndFilter(filter, sort,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(response => {
                this.contactsSubject.next(response.content);
                this.total = response.totalElements;
            },
                error => {
                    // this.errorService.dialogConfig = { ...this.dialogConfig };
                    this.errorService.handleError(error);
                }
            );
    }

    connect(collectionViewer: CollectionViewer): Observable<Contact[]> {
        console.log('Connecting data source');
        return this.contactsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.contactsSubject.complete();
        this.loadingSubject.complete();
    }

}

