import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { GroupsService } from '../../../../core/services/groups.service';
import { ErrorHandlerService } from '../../../../core/services/error-handler.service';

@Component({
  selector: 'app-group-member-selection-dialog',
  templateUrl: './group-member-selection-dialog.component.html',
  styleUrls: ['./group-member-selection-dialog.component.css']
})
export class GroupMemberSelectionDialogComponent implements OnInit {
    groupId: string;
    constructor(
        private repository: GroupsService,

        private errorHandler: ErrorHandlerService,

        private dialogRef: MatDialogRef<GroupMemberSelectionDialogComponent>,

        private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) data) {

        this.groupId = data.groupId;
    }

  ngOnInit() {
  }

}
