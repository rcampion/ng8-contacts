
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { User } from './../models/user';
import { UsersService } from './users.service';
import { BehaviorSubject } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginationPage, PaginationPropertySort } from '../interface/pagination';
import { ErrorHandlerService } from './error-handler.service';

export class UsersDataSource implements DataSource<User> {

    private usersSubject = new BehaviorSubject<User[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    public paginationPage: Object;

    public total = 0;

    constructor(private usersService: UsersService,
        private errorService: ErrorHandlerService) {

    }

    loadUsers(
        filter: string,
        sortProperty: string,
        sortDirection: string,
        pageIndex: number,
        pageSize: number) {

        this.loadingSubject.next(true);

        const sort = new PaginationPropertySort();
        sort.property = sortProperty;
        sort.direction = sortDirection;

        this.usersService.findUsersWithSortAndFilter(filter, sort,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(response => {
                this.usersSubject.next(response.content);
                this.total = response.totalElements;
            },
                error => {
                    // this.errorService.dialogConfig = { ...this.dialogConfig };
                    this.errorService.handleError(error);
                }
            );
    }

    connect(collectionViewer: CollectionViewer): Observable<User[]> {
        console.log('Connecting data source');
        return this.usersSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.usersSubject.complete();
        this.loadingSubject.complete();
    }

}

