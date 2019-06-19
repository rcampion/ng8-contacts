import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { UsersService } from '../../core/services/users.service';
import { ErrorHandlerService } from '../../core/services/error-handler.service';

@Component({
    selector: 'app-user-delete-dialog',
    templateUrl: './user-delete-dialog.component.html',
    styleUrls: ['./user-delete-dialog.component.css']
})
export class UserDeleteDialogComponent implements OnInit {
    id: string;
    constructor(
        private repository: UsersService,

        private errorHandler: ErrorHandlerService,

        private dialogRef: MatDialogRef<UserDeleteDialogComponent>,

        private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) data) {

        this.id = data.id;
    }

    ngOnInit() {
    }
    public delete() {
        const apiUrl = `users/${this.id}`;
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
