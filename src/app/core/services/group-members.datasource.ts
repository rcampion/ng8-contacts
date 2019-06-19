
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { GroupMember } from '../interface/group-member.model';
import { GroupsService } from './groups.service';
import { BehaviorSubject } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginationPage, PaginationPropertySort } from '../interface/pagination';

export class GroupMembersDataSource implements DataSource<GroupMember> {

    private contactsSubject = new BehaviorSubject<GroupMember[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    public paginationPage: Object;

    public total = 0;

    constructor(private groupsService: GroupsService) {

    }

    loadGroupMembers(
        groupId: number,
        filter: string,
        sortProperty: string,
        sortDirection: string,
        pageIndex: number,
        pageSize: number) {

        this.loadingSubject.next(true);

        const sort = new PaginationPropertySort();
        sort.property = sortProperty;
        sort.direction = sortDirection;

        this.groupsService.findGroupMembersWithSortAndFilter(groupId, filter, sort,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(response => {
                this.contactsSubject.next(response.content);
                this.total = response.totalElements;
            }
            );
    }

    connect(collectionViewer: CollectionViewer): Observable<GroupMember[]> {
        console.log('Connecting data source');
        return this.contactsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.contactsSubject.complete();
        this.loadingSubject.complete();
    }

}

