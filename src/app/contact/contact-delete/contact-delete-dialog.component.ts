import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { ContactsService } from '../../core/services/contacts.service';
import { ErrorHandlerService } from '../../core/services/error-handler.service';

@Component({
    selector: 'app-contact-delete-dialog',
    templateUrl: './contact-delete-dialog.component.html',
    styleUrls: ['./contact-delete-dialog.component.css']
})
export class ContactDeleteDialogComponent implements OnInit {
    id: string;
    constructor(
        private repository: ContactsService,

        private errorHandler: ErrorHandlerService,

        private dialogRef: MatDialogRef<ContactDeleteDialogComponent>,

        private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) data) {

        this.id = data.id;
    }

    ngOnInit() {
    }
    public delete() {
        const apiUrl = `contact/${this.id}`;
        this.repository.delete(apiUrl)
            .subscribe(res => {
                this.id = res as string;
            },
                (error) => {
                    this.errorHandler.handleError(error);
                });
        this.dialogRef.close();

    }

}
