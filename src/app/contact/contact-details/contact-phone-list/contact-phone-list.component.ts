import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';
import { EMail } from '../../../core/interface/email.model';
import { Contact } from '../../../core/interface/contact.model';
import { ContactsService } from '../../../core/services/contacts.service';
import { PaginationPage } from '../../../core/interface/pagination';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ContactPhoneCreateDialogComponent } from './../contact-phone-create-dialog/contact-phone-create-dialog.component';
import { ContactPhoneUpdateDialogComponent } from './../contact-phone-update-dialog/contact-phone-update-dialog.component';

export interface PhoneType {
    value: number;
    viewValue: string;
}

@Component({
  selector: 'app-contact-phone-list',
  templateUrl: './contact-phone-list.component.html',
  styleUrls: ['./contact-phone-list.component.css']
})
export class ContactPhoneListComponent implements OnInit, AfterViewInit {
    phoneTypes: PhoneType[] = [
        { value: 0, viewValue: 'Home' },
        { value: 1, viewValue: 'Office' },
        { value: 2, viewValue: 'Mobile' }

    ];
    public displayedColumns = ['phone', 'phoneKind', 'update', 'delete'];
    public dataSource = new MatTableDataSource<EMail>();

    @ViewChild(MatSort, {static:false}) sort: MatSort;
    @ViewChild(MatPaginator, {static:false}) paginator: MatPaginator;

    currentContact: Contact;

    private dialogConfig;

    updateContactPhoneDialogRef: MatDialogRef<ContactPhoneUpdateDialogComponent>;

    // tslint:disable-next-line:max-line-length
    constructor(private repository: ContactsService, private errorService: ErrorHandlerService, private router: Router, private activeRoute: ActivatedRoute, private dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) { }
    ngOnInit() {
        this.getAllPhones();

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

    public getAllPhones = () => {
        const id: string = this.activeRoute.snapshot.params['id'];
        const apiUrl = `contact/phone/${id}`;
        this.repository.getData(apiUrl)
            .subscribe(res => {
                const data = res as PaginationPage<EMail>;
                this.dataSource.data = data.content;
                this.changeDetectorRefs.detectChanges();
            });
    }
    public delete = (id: string) => {
        const apiUrl = `contact/phone/${id}`;
        this.repository.delete(apiUrl)
            .subscribe(res => {
                id = res as string;
                this.getAllPhones();
            },
                (error) => {
                    this.errorService.handleError(error);
                });
    }
    public redirectToAdd = () => {
        const id: string = this.activeRoute.snapshot.params['id'];
         this.dialogConfig.data = {
            contactId: id
        };
        const dialogRef = this.dialog.open(ContactPhoneCreateDialogComponent, this.dialogConfig)
            .afterClosed().subscribe(result => {
                this.getAllPhones();
            });
    }

    public redirectToUpdate = (id: string) => {
        this.dialogConfig.data = {
            phoneId: id
        };
        const dialogRef = this.dialog.open(ContactPhoneUpdateDialogComponent, this.dialogConfig)
            .afterClosed().subscribe(result => {
                this.getAllPhones();
            });
    }
}



