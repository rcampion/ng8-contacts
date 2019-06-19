import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Group } from '../../core/interface/group.model';
import { GroupsDataSource } from '../../core/services/groups.datasource';
import { GroupsService } from '../../core/services/groups.service';
import { PaginationPage } from '../../core/interface/pagination';
import { ErrorHandlerService } from '../../core/services/error-handler.service';
import { Router } from '@angular/router';
import { GroupDeleteDialogComponent } from './../group-delete/group-delete-dialog.component';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { merge } from 'rxjs';
import { fromEvent } from 'rxjs';

@Component({
    selector: 'app-group-list',
    templateUrl: './group-list.component.html',
    styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit, AfterViewInit {

    public displayedColumns = ['groupName', 'groupDescription', 'details', 'update', 'delete'];
    // public dataSource = new MatTableDataSource<Group>();
    dataSource: GroupsDataSource;
    @ViewChild(MatSort, {static:false}) sort: MatSort;
    @ViewChild(MatPaginator, {static:false}) paginator: MatPaginator;
    @ViewChild('input', {static:false}) input: ElementRef;
    currentGroup: Group;

    groupsLength = 0;

    sortProperty = '';
    private dialogConfig;

    deleteGroupDialogRef: MatDialogRef<GroupDeleteDialogComponent>;

    // tslint:disable-next-line:max-line-length
    constructor(private repository: GroupsService, private errorService: ErrorHandlerService, private router: Router, private dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) { }
    ngOnInit() {

        this.dataSource = new GroupsDataSource(this.repository);

        this.dataSource.loadGroups('', '', 'asc', 0, 6);

        this.dialogConfig = {
            height: '200px',
            width: '400px',
            disableClose: true,
            data: {}
        };
    }

    ngAfterViewInit(): void {

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

                    this.loadGroupsPage();
                })
            )
            .subscribe();

        merge(this.sort.sortChange, this.paginator.page)
            .pipe(
                tap(() => this.loadGroupsPage())
            )
            .subscribe(

                data => {
                    console.log(data);
                }

            );

    }
/*
    public getAllGroups = () => {
        this.repository.getData('group')
            .subscribe(res => {
                const data = res as PaginationPage<Group>;
                this.dataSource.data = data.content;
                this.changeDetectorRefs.detectChanges();
            },
                (error) => {
                    this.errorService.handleError(error);
                });
    }
*/
    public doFilter = (value: string) => {
//        this.dataSource.filter = value.trim().toLocaleLowerCase();
    }

    public redirectToAdd = () => {
        const url = `/group/create`;
        this.router.navigate([url]);
    }

    public redirectToDetails = (id: string) => {
        const url = `/group/details/${id}`;
        this.router.navigate([url]);
    }

    public redirectToUpdate = (id: string) => {
        const url = `/group/update/${id}`;
        this.router.navigate([url]);
    }

    public redirectToDelete = (id: string) => {
        this.dialogConfig.data = {
            id: id
        };
        const dialogRef = this.dialog.open(GroupDeleteDialogComponent, this.dialogConfig)
            .afterClosed().subscribe(result => {
                this.loadGroupsPage();
            });
    }
    loadGroupsPage() {
        this.dataSource.loadGroups(

            this.input.nativeElement.value,
            this.sortProperty,
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize);

    }
}
