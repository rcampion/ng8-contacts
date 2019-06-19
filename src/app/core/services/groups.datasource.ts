
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Group } from '../interface/group.model';
import { GroupsService } from './groups.service';
import { BehaviorSubject } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginationPage, PaginationPropertySort } from '../interface/pagination';

export class GroupsDataSource implements DataSource<Group> {

    private groupsSubject = new BehaviorSubject<Group[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    public paginationPage: Object;

    public total = 0;

    constructor(private groupsService: GroupsService) {

    }

    loadGroups(
        filter: string,
        sortProperty: string,
        sortDirection: string,
        pageIndex: number,
        pageSize: number) {

        this.loadingSubject.next(true);

        const sort = new PaginationPropertySort();
        sort.property = sortProperty;
        sort.direction = sortDirection;

        this.groupsService.findGroupsWithSortAndFilter(filter, sort,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(response => {
                this.groupsSubject.next(response.content);
                this.total = response.totalElements;
            }
            );
    }

    connect(collectionViewer: CollectionViewer): Observable<Group[]> {
        console.log('Connecting data source');
        return this.groupsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.groupsSubject.complete();
        this.loadingSubject.complete();
    }

}

