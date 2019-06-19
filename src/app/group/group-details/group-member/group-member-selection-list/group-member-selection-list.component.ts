import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Contact } from '../../../../core/interface/contact.model';
import { ContactsService } from '../../../../core/services/contacts.service';
import { PaginationPage } from '../../../../core/interface/pagination';
import { ErrorHandlerService } from '../../../../core/services/error-handler.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { GroupMemberSelectionDialogComponent } from './../group-member-selection-dialog/group-member-selection-dialog.component';

@Component({
  selector: 'app-group-member-selection-list',
  templateUrl: './group-member-selection-list.component.html',
  styleUrls: ['./group-member-selection-list.component.css']
})
export class GroupMemberSelectionListComponent implements OnInit, AfterViewInit {

    public displayedColumns = ['firstName', 'lastName', 'company', 'add'];
    public dataSource = new MatTableDataSource<Contact>();

    @ViewChild(MatSort, {static:false}) sort: MatSort;
    @ViewChild(MatPaginator, {static:false}) paginator: MatPaginator;

    groupId: string;

    currentContact: Contact;

    private dialogConfig;

    groupMemberSelectionDialogRef: MatDialogRef<GroupMemberSelectionDialogComponent>;

    // tslint:disable-next-line:max-line-length
    constructor(
        private dialogRef: GroupMemberSelectionDialogComponent,
        private repository: ContactsService,
        private errorService: ErrorHandlerService,
        private router: Router,
        private activeRoute: ActivatedRoute,
        private dialog: MatDialog,
        private changeDetectorRefs: ChangeDetectorRef) {

       // this.groupMemberSelectionDialogRef = dialogRef;
     }
    ngOnInit() {
        this.getFilteredContacts();

        this.dialogConfig = {
            height: '400px',
            width: '1000px',
            disableClose: true,
            data: {}
        };
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    public getFilteredContacts = () => {
        this.groupId = this.dialogRef.groupId;

        const url = `group/member/filtered/${this.groupId}`;

        this.repository.getData(url)
            .subscribe(res => {
                const data = res as PaginationPage<Contact>;
                this.dataSource.data = data.content;
                this.changeDetectorRefs.detectChanges();
            });
    }
    public addMember = (id: string) => {
        const apiUrl  = 'group/member/' + this.groupId + '/' + id;

        this.repository.create(apiUrl, null)
            .subscribe(res => {
                this.getFilteredContacts();
                console.log('group member add completed');
            });
    }

    public doFilter = (value: string) => {
        this.dataSource.filter = value.trim().toLocaleLowerCase();
    }

}
