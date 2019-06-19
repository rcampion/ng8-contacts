import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { GroupsService } from '../../core/services/groups.service';
import { ErrorHandlerService } from '../../core/services/error-handler.service';

@Component({
    selector: 'app-group-delete-dialog',
    templateUrl: './group-delete-dialog.component.html',
    styleUrls: ['./group-delete-dialog.component.css']
})
export class GroupDeleteDialogComponent implements OnInit {
    id: string;
    constructor(
        private repository: GroupsService,

        private errorHandler: ErrorHandlerService,

        private dialogRef: MatDialogRef<GroupDeleteDialogComponent>,

        private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) data) {

        this.id = data.id;
    }

    ngOnInit() {
    }
    public delete() {
        const apiUrl = `group/${this.id}`;
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
