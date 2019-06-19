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
    selector: 'app-user-authorities-create-dialog',
    templateUrl: './user-authorities-create-dialog.component.html',
    styleUrls: ['./user-authorities-create-dialog.component.css']
})
export class UserAuthoritiesCreateDialogComponent implements OnInit {
    authorityTypes: AuthorityType[] = [
        { viewValue: 'ROLE_ADMIN' },
        { viewValue: 'ROLE_USER' }
    ];

    public authorityForm: FormGroup;

    authority: Authority;

    userName: string;

    constructor(
        private location: Location,

        private repository: UsersService,

        private activeRoute: ActivatedRoute,

        private errorService: ErrorHandlerService,

        private dialogRef: MatDialogRef<UserAuthoritiesCreateDialogComponent>,

        private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) data) {

        this.userName = data.userName;
    }

    ngOnInit() {

        this.authorityForm = new FormGroup({
            id: new FormControl(''),
            userName: new FormControl(''),
            authority: new FormControl(''),

        });
    }
    public createAuthority = (authorityFormValue) => {
        if (this.authorityForm.valid) {
            this.executeAuthorityCreate(authorityFormValue);
        }
    }

    private executeAuthorityCreate = (authorityFormValue) => {
        const authority: Authority = {
            id: authorityFormValue.id,
            userName: this.userName,
            authority: authorityFormValue.authority,
        };

        const apiUrl = 'users/authority';
        this.repository.create(apiUrl, authority)
            .subscribe(res => {
                this.dialog.closeAll();
            },
                (error => {
                    this.errorService.handleError(error);
                })
            );
    }

    public hasError = (controlName: string, errorName: string) => {
        return this.authorityForm.controls[controlName].hasError(errorName);
    }

    public onCancel = () => {
        this.dialog.closeAll();
    }
}
