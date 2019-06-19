import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { GroupsService } from '../../core/services/groups.service';
import { Group } from '../../core/interface/group.model';
import { MatDialog } from '@angular/material';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '../../core/services/error-handler.service';

@Component({
    selector: 'app-group-create',
    templateUrl: './group-create.component.html',
    styleUrls: ['./group-create.component.css']
})
export class GroupCreateComponent implements OnInit {
    public groupForm: FormGroup;
    private dialogConfig;

    // tslint:disable-next-line:max-line-length
    constructor(private location: Location, private repository: GroupsService, private dialog: MatDialog, private errorService: ErrorHandlerService) { }

    ngOnInit() {
        this.groupForm = new FormGroup({
            groupId: new FormControl(''),
            groupName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
            groupDescription: new FormControl('', [Validators.required, Validators.maxLength(120)])

        });

        this.dialogConfig = {
            height: '200px',
            width: '400px',
            disableClose: true,
            data: {}
        };
    }

    public hasError = (controlName: string, errorName: string) => {
        return this.groupForm.controls[controlName].hasError(errorName);
    }

    public onCancel = () => {
        this.location.back();
    }

    public createGroup = (groupFormValue) => {
        if (this.groupForm.valid) {
            this.executeGroupCreation(groupFormValue);
        }
    }

    private executeGroupCreation = (groupFormValue) => {
        const group: Group = {
            groupId: '',
            groupName: groupFormValue.groupName,
            groupDescription: groupFormValue.groupDescription,

        };

        const apiUrl = 'group';
        this.repository.create(apiUrl, group)
            .subscribe(res => {
                const dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);

                // we are subscribing on the [mat-dialog-close] attribute as soon as we click on the dialog button
                dialogRef.afterClosed()
                    .subscribe(result => {
                        this.location.back();
                    });
            },
                (error => {
                    this.errorService.dialogConfig = { ...this.dialogConfig };
                    this.errorService.handleError(error);
                })
            );
    }

}
