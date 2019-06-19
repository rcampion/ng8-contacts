import { Component, Inject, OnInit, AfterViewInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { merge } from 'rxjs';
import { fromEvent } from 'rxjs';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';
import { User } from '../../../../core/models/user';
import { Authority } from '../../../../core/models/authority';
import { UsersService } from '../../../../core/services/users.service';
import { PaginationPage } from '../../../../core/interface/pagination';
import { ErrorHandlerService } from '../../../../core/services/error-handler.service';
import { UserAuthoritiesCreateDialogComponent} from './../user-authorities-create-dialog/user-authorities-create-dialog.component';
import { UserAuthoritiesUpdateDialogComponent} from './../user-authorities-update-dialog/user-authorities-update-dialog.component';

export interface AuthorityType {
    value: number;
    viewValue: string;
}

@Component({
    selector: 'app-user-authorities-list',
    templateUrl: './user-authorities-list.component.html',
    styleUrls: ['./user-authorities-list.component.css']
})
export class UserAuthoritiesListComponent implements OnInit, AfterViewInit {
    authorityTypes: AuthorityType[] = [
        { value: 0, viewValue: 'ROLE_ADMIN' },
        { value: 1, viewValue: 'ROLE_USER' }
    ];

    public user: User;
    userId: number;
    authorityId: number;

    public displayedColumns = ['authority', 'update', 'delete'];
    public dataSource = new MatTableDataSource<Authority>();

    @ViewChild(MatSort, {static:false}) sort: MatSort;
    @ViewChild(MatPaginator, {static:false}) paginator: MatPaginator;


    updateAuthorityDialogRef: MatDialogRef<UserAuthoritiesUpdateDialogComponent>;

    private dialogConfig;

    sortProperty = '';
    // tslint:disable-next-line:max-line-length
    constructor(private repository: UsersService, private errorService: ErrorHandlerService, @Inject(Router) private router: Router, private activeRoute: ActivatedRoute, private dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) {
        this.userId = activeRoute.snapshot.params['id'];
    }

    ngOnInit() {
        this.getUserDetails();

        this.dialogConfig = {
            height: '400px',
            width: '800px',
            disableClose: true,
            data: {}
        };
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    private getUserDetails = () => {
        const id: string = this.activeRoute.snapshot.params['id'];
        const apiUrl = `users/${id}`;

        this.repository.getData(apiUrl)
            .subscribe(res => {
                this.user = res as User;
                this.getAllAuthorities();
            },
                (error) => {
                    this.errorService.handleError(error);
                });
    }

    public getAllAuthorities = () => {
        const userName: string = this.user.userName;
        const password: string = this.user.password;
        const login = JSON.stringify({ login: userName, password: password });
        const apiUrl = 'users/authorities';
        this.repository.create(apiUrl, login)
            .subscribe(res => {
                const data = res as PaginationPage<Authority>;
                this.dataSource.data = data.content;
                this.changeDetectorRefs.detectChanges();
            },
                (error) => {
                    this.errorService.handleError(error);
                });
    }

    public redirectToAdd = () => {

        this.dialogConfig.data = {
            userName: this.user.userName
        };
        const dialogRef = this.dialog.open(UserAuthoritiesCreateDialogComponent, this.dialogConfig)
            .afterClosed().subscribe(result => {
                this.getAllAuthorities();
            });
    }

    public redirectToUpdate = (id: string) => {
        this.dialogConfig.data = {
            id: id
        };
        const dialogRef = this.dialog.open(UserAuthoritiesUpdateDialogComponent, this.dialogConfig)
            .afterClosed().subscribe(result => {
                this.getAllAuthorities();
            });
    }

    public delete = (id: string) => {
        const apiUrl = `users/authority/${id}`;
        this.repository.delete(apiUrl)
            .subscribe(res => {
                id = res as string;
                this.getAllAuthorities();
            },
                (error) => {
                    this.errorService.handleError(error);
                });
    }
}
