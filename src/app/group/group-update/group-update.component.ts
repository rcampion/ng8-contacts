import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { Group } from '../../core/interface/group.model';

import { Router, ActivatedRoute } from '@angular/router';
import { GroupsService } from '../../core/services/groups.service';

import { MatDialog } from '@angular/material';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '../../core/services/error-handler.service';

@Component({
    selector: 'app-group-update',
    templateUrl: './group-update.component.html',
    styleUrls: ['./group-update.component.css']
})
export class GroupUpdateComponent implements OnInit {
    public group: Group;
    public groupForm: FormGroup;

    private dialogConfig;

    // tslint:disable-next-line:max-line-length
    constructor(private location: Location, private repository: GroupsService, private dialog: MatDialog,
        router: Router,
        private activeRoute: ActivatedRoute, private errorService: ErrorHandlerService) { }


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

        this.getGroupDetails();


    }
    private getGroupDetails = () => {
        const id: string = this.activeRoute.snapshot.params['id'];
        const apiUrl = `group/${id}`;

        this.repository.getData(apiUrl)
            .subscribe(res => {
                this.group = res as Group;
                this.populateForm();
            },
                (error) => {
                    this.errorService.handleError(error);
                });
    }

    private populateForm() {
        this.groupForm.controls['groupId'].setValue(this.group.groupId);
        this.groupForm.controls['groupName'].setValue(this.group.groupName);
        this.groupForm.controls['groupDescription'].setValue(this.group.groupDescription);
    }

    public updateGroup = (groupFormValue) => {
        if (this.groupForm.valid) {
            this.executeGroupUpdate(groupFormValue);
        }
    }

    private executeGroupUpdate = (groupFormValue) => {
        const group: Group = {
            groupId: groupFormValue.groupId,
            groupName: groupFormValue.groupName,
            groupDescription: groupFormValue.groupDescription,
         };

        const apiUrl = 'group';
        this.repository.update(apiUrl, group)
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

    public hasError = (controlName: string, errorName: string) => {
        return this.groupForm.controls[controlName].hasError(errorName);
    }

    public onCancel = () => {
        this.location.back();
    }

}
