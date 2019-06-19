import { Component, Inject, OnInit, AfterViewInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { merge } from 'rxjs';
import { fromEvent } from 'rxjs';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';
import { UserContact } from '../../core/interface/user-contact.model';
import { UserContactsDataSource } from '../../core/services/user-contacts.datasource';
import { ContactsService } from '../../core/services/contacts.service';
import { PaginationPage } from '../../core/interface/pagination';
import { ErrorHandlerService } from '../../core/services/error-handler.service';
import { UserContactsSelectionDialogComponent } from './../user-contacts-selection-dialog/user-contacts-selection-dialog.component';
import { UsersService } from '../../core/services/users.service';
import { ContactDeleteDialogComponent } from './../../contact/contact-delete/contact-delete-dialog.component';

@Component({
    selector: 'app-user-contacts-list',
    templateUrl: './user-contacts-list.component.html',
    styleUrls: ['./user-contacts-list.component.css'],
    providers: [UsersService]
})
export class UserContactsListComponent implements OnInit, AfterViewInit {

    userId: number;

    loginService: UsersService;

    public displayedColumns = ['firstName', 'lastName', 'company', 'details', 'update', 'delete'];
    // public dataSource = new MatTableDataSource<UserContact>();
    dataSource: UserContactsDataSource;

    @ViewChild(MatSort, {static:false}) sort: MatSort;
    @ViewChild(MatPaginator, {static:false}) paginator: MatPaginator;
    @ViewChild('input', {static:false}) input: ElementRef;

    currentUserContact: UserContact;

    private deleteDialogConfig;
    private selectDialogConfig;
    sortProperty = '';

    deleteContactDialogRef: MatDialogRef<ContactDeleteDialogComponent>;

    // tslint:disable-next-line:max-line-length
    constructor(loginService: UsersService, private repository: ContactsService, private errorService: ErrorHandlerService, @Inject(Router) private router: Router, private activeRoute: ActivatedRoute, private dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) {

        this.loginService = loginService;

        this.userId = this.loginService.getUserId();
    }

    ngOnInit() {
        this.dataSource = new UserContactsDataSource(this.repository);

        this.dataSource.loadUserContacts(this.userId, '', '', 'asc', 0, 6);

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

                    this.loadContactsPage();
                })
            )
            .subscribe();

        merge(this.sort.sortChange, this.paginator.page)
            .pipe(
                tap(() => this.loadContactsPage())
            )
            .subscribe(

                data => {
                    console.log(data);
                }

            );

    }

    public delete = (element: UserContact) => {

        if (element.contactId) {
            let id = element.id;
            const apiUrl = `user/contacts/${id}`;
            this.repository.delete(apiUrl)
                .subscribe(res => {
                    id = res as string;
                    this.loadContactsPage();
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
                    this.loadContactsPage();
                });
        }
    }

    public redirectToAdd = () => {
        const id: number = this.userId;
        this.selectDialogConfig.data = {
            userId: id
        };
        const dialogRef = this.dialog.open(UserContactsSelectionDialogComponent, this.selectDialogConfig)
            .afterClosed().subscribe(result => {
                this.loadContactsPage();
            });
    }

    public redirectToDetails = (element: UserContact) => {
        let url = '';
        if (element.contactId) {
            url = `/contact/details/${element.contactId}`;
        } else {
            url = `/contact/details/${element.id}`;
        }
        this.router.navigate([url]);
    }

    public redirectToUpdate = (element: UserContact) => {
        let url = '';
        if (element.contactId) {
            url = `/contact/update/${element.contactId}`;
        } else {
            url = `/contact/update/${element.id}`;
        }
        this.router.navigate([url]);
    }

    public doFilter = (value: string) => {
        //        this.dataSource.filter = value.trim().toLocaleLowerCase();
    }

    loadContactsPage() {
        this.dataSource.loadUserContacts(
            this.userId,
            this.input.nativeElement.value,
            this.sortProperty,
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize);

    }
}
