import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMail } from '../../../core/interface/email.model';
import { Contact } from '../../../core/interface/contact.model';
import { ContactsService } from '../../../core/services/contacts.service';
import { PaginationPage } from '../../../core/interface/pagination';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ContactEmailCreateDialogComponent } from './../contact-email-create-dialog/contact-email-create-dialog.component';
import { ContactEmailUpdateDialogComponent } from './../contact-email-update-dialog/contact-email-update-dialog.component';

export interface EMailType {
    value: number;
    viewValue: string;
}

@Component({
    selector: 'app-contact-email-list',
    templateUrl: './contact-email-list.component.html',
    styleUrls: ['./contact-email-list.component.css']
})
export class ContactEmailListComponent implements OnInit, AfterViewInit {
    emailTypes: EMailType[] = [
        { value: 0, viewValue: 'Personal' },
        { value: 1, viewValue: 'Business' }

    ];

    public displayedColumns = ['email', 'emailKind', 'update', 'delete', 'send'];

    public dataSource = new MatTableDataSource<EMail>();

    @ViewChild(MatSort, {static:false}) sort: MatSort;
    @ViewChild(MatPaginator, {static:false}) paginator: MatPaginator;

    currentContact: Contact;

    private dialogConfig;

    updateContactEmailDialogRef: MatDialogRef<ContactEmailUpdateDialogComponent>;

    // tslint:disable-next-line:max-line-length
    constructor(private repository: ContactsService, private errorService: ErrorHandlerService, private router: Router, private activeRoute: ActivatedRoute, private dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) { }
    ngOnInit() {
        this.getAllEMails();

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

    public getAllEMails = () => {
        const id: string = this.activeRoute.snapshot.params['id'];
        const apiUrl = `contact/email/${id}`;
        this.repository.getData(apiUrl)
            .subscribe(res => {
                const data = res as PaginationPage<EMail>;
                this.dataSource.data = data.content;
                this.changeDetectorRefs.detectChanges();
            },
                (error) => {
                    this.errorService.handleError(error);
                });
    }

    public delete = (id: string) => {
        const apiUrl = `contact/email/${id}`;
        this.repository.delete(apiUrl)
            .subscribe(res => {
                id = res as string;
                this.getAllEMails();
            },
                (error) => {
                    this.errorService.handleError(error);
                });
    }

    public send = (id: string) => {
        const url = `/email/${id}`;
        this.router.navigate([url]);
    }

    public redirectToAdd = () => {
        const id: string = this.activeRoute.snapshot.params['id'];
        this.dialogConfig.data = {
            contactId: id
        };
        const dialogRef = this.dialog.open(ContactEmailCreateDialogComponent, this.dialogConfig)
            .afterClosed().subscribe(result => {
                this.getAllEMails();
            });
    }

    public redirectToUpdate = (id: string) => {
        this.dialogConfig.data = {
            emailId: id
        };
        const dialogRef = this.dialog.open(ContactEmailUpdateDialogComponent, this.dialogConfig)
            .afterClosed().subscribe(result => {
                this.getAllEMails();
            });
    }
}


