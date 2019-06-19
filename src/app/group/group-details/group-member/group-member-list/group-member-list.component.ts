import { Component, Inject, OnInit, AfterViewInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';
import { GroupMember } from '../../../../core/interface/group-member.model';
import { GroupMembersDataSource } from '../../../../core/services/group-members.datasource';
import { GroupsService } from '../../../../core/services/groups.service';
import { PaginationPage } from '../../../../core/interface/pagination';
import { ErrorHandlerService } from '../../../../core/services/error-handler.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { merge } from 'rxjs';
import { fromEvent } from 'rxjs';

import { GroupMemberSelectionDialogComponent } from './../group-member-selection-dialog/group-member-selection-dialog.component';

import { ContactDeleteDialogComponent } from './../../../../contact/contact-delete/contact-delete-dialog.component';


@Component({
    selector: 'app-group-member-list',
    templateUrl: './group-member-list.component.html',
    styleUrls: ['./group-member-list.component.css']
})
export class GroupMemberListComponent implements OnInit, AfterViewInit {

    groupId: number;

    public displayedColumns = ['firstName', 'lastName', 'company', 'details', 'update', 'delete'];
    // public dataSource = new MatTableDataSource<GroupMember>();
    dataSource: GroupMembersDataSource;
    @ViewChild(MatSort, {static:false}) sort: MatSort;
    @ViewChild(MatPaginator, {static:false}) paginator: MatPaginator;
    @ViewChild('input', {static:false}) input: ElementRef;

    currentGroupMember: GroupMember;

    private deleteDialogConfig;
    private selectDialogConfig;
    sortProperty = '';
    // tslint:disable-next-line:max-line-length
    constructor(private repository: GroupsService, private errorService: ErrorHandlerService, @Inject(Router) private router: Router, private activeRoute: ActivatedRoute, private dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) {
        this.groupId = activeRoute.snapshot.params['id'];
    }

    ngOnInit() {

        this.dataSource = new GroupMembersDataSource(this.repository);

        this.dataSource.loadGroupMembers(this.groupId, '', '', 'asc', 0, 6);

        this.deleteDialogConfig = {
            height: '200px',
            width: '400px',
            disableClose: true,
            data: {}
        };

        this.selectDialogConfig = {
            height: '800px',
            width: '800px',
            disableClose: true,
            data: {}
        };
    }

    ngAfterViewInit() {

        this.sort.sortChange.subscribe((event) => {
            this.paginator.pageIndex = 0;
            this.sortProperty = event.active;
        });

        fromEvent(this.input.nativeElement, 'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                    this.paginator.pageIndex = 0;

                    this.loadGroupMembersPage();
                })
            )
            .subscribe();

        merge(this.sort.sortChange, this.paginator.page)
            .pipe(
                tap(() => this.loadGroupMembersPage())
            )
            .subscribe(

                data => {
                    console.log(data);
                }

            );

    }

    public delete = (element: GroupMember) => {

        if (element.contactId) {
            let id = element.id;
            const apiUrl = `group/member/${id}`;
            this.repository.delete(apiUrl)
                .subscribe(res => {
                    id = res as string;
                    this.loadGroupMembersPage();
                },
                    (error) => {
                        this.errorService.handleError(error);
                    });
        } else {
            const id = element.id;
            this.deleteDialogConfig.data = {
                id: id
            };
            const dialogRef = this.dialog.open(ContactDeleteDialogComponent, this.deleteDialogConfig)
                .afterClosed().subscribe(result => {
                    this.loadGroupMembersPage();
                });
        }
    }

    public redirectToAdd = () => {
        const id: string = this.activeRoute.snapshot.params['id'];
        this.selectDialogConfig.data = {
            groupId: id
        };
        const dialogRef = this.dialog.open(GroupMemberSelectionDialogComponent, this.selectDialogConfig)
            .afterClosed().subscribe(result => {
                this.loadGroupMembersPage();
            });
    }

    public redirectToDetails = (element: GroupMember) => {
        let url = '';
        if (element.contactId) {
            url = `/contact/details/${element.contactId}`;
        } else {
            url = `/contact/details/${element.id}`;
        }
        this.router.navigate([url]);
    }

    public redirectToUpdate = (element: GroupMember) => {
        let url = '';
        if (element.contactId) {
            url = `/contact/update/${element.contactId}`;
        } else {
            url = `/contact/update/${element.id}`;
        }
        this.router.navigate([url]);
    }

    public doFilter = (value: string) => {
 //       this.dataSource.filter = value.trim().toLocaleLowerCase();
    }

    loadGroupMembersPage() {
        this.dataSource.loadGroupMembers(
            this.groupId,
            this.input.nativeElement.value,
            this.sortProperty,
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize);

    }
}
