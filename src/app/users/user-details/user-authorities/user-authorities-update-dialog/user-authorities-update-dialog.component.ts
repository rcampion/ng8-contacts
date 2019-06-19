import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { UsersService } from '../../../../core/services/users.service';
import { ErrorHandlerService } from '../../../../core/services/error-handler.service';
import { Authority } from '../../../../core/models/authority';

export interface AuthorityType {
 //   value: number;
    viewValue: string;
}

@Component({
    selector: 'app-user-authorities-update-dialog',
    templateUrl: './user-authorities-update-dialog.component.html',
    styleUrls: ['./user-authorities-update-dialog.component.css']
})
export class UserAuthoritiesUpdateDialogComponent implements OnInit {

    authorityTypes: AuthorityType[] = [
        { viewValue: 'ROLE_ADMIN' },
        { viewValue: 'ROLE_USER' }
    ];

    authorityId: string;

    authority: Authority;

    public authorityForm: FormGroup;
    constructor(
        private location: Location,

        private repository: UsersService,

        private activeRoute: ActivatedRoute,

        private errorService: ErrorHandlerService,

        private dialogRef: MatDialogRef<UserAuthoritiesUpdateDialogComponent>,

        private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) data) {

        this.authorityId = data.id;
    }

    ngOnInit() {

        this.authorityForm = new FormGroup({
            id: new FormControl(''),
            userName: new FormControl(''),
            authority: new FormControl(''),

        });

        this.getAuthority();

    }
    private getAuthority = () => {

        const apiUrl = `users/authorities/${this.authorityId}`;

        this.repository.getData(apiUrl)
            .subscribe(res => {
                this.authority = res as Authority;
                this.populateForm();
            },
                (error) => {
                    this.errorService.handleError(error);
                });
    }

    private populateForm() {
        this.authorityForm.controls['id'].setValue(this.authority.id);
        this.authorityForm.controls['userName'].setValue(this.authority.userName);
        this.authorityForm.controls['authority'].setValue(this.authority.authority);
    }

    public updateAuthority = (authorityFormValue) => {
        if (this.authorityForm.valid) {
            this.executeAuthorityUpdate(authorityFormValue);
        }
    }

    private executeAuthorityUpdate = (authorityFormValue) => {
        const authority: Authority = {
            id: authorityFormValue.id,
            userName: authorityFormValue.userName,
            authority: authorityFormValue.authority,
        };

        const apiUrl = 'users/authority/authority';
        this.repository.update(apiUrl, authority)
            .subscribe(res => {
                this.dialog.closeAll();
            },
                (error => {
                    this.errorService.handleError(error);
                })
            );
    }

    public onCancel = () => {
        this.dialog.closeAll();
    }
}
