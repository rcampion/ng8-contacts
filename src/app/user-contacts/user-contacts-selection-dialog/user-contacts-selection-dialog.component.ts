import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { GroupsService } from '../../core/services/groups.service';
import { ErrorHandlerService } from '../../core/services/error-handler.service';

@Component({
  selector: 'app-user-contacts-selection-dialog',
  templateUrl: './user-contacts-selection-dialog.component.html',
  styleUrls: ['./user-contacts-selection-dialog.component.css']
})
export class UserContactsSelectionDialogComponent implements OnInit {
    userId: string;
    constructor(
        private repository: GroupsService,

        private errorHandler: ErrorHandlerService,

        private dialogRef: MatDialogRef<UserContactsSelectionDialogComponent>,

        private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) data) {

        this.userId = data.userId;
    }

  ngOnInit() {
  }

}
