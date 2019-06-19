import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { User } from '../../core/models/user';
import { UsersService } from '../../core/services/users.service';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '../../core/services/error-handler.service';

@Component({
    selector: 'app-user-create',
    templateUrl: './user-create.component.html',
    styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
    public userForm: FormGroup;
    private dialogConfig;

    // tslint:disable-next-line:max-line-length
    constructor(private location: Location,
        private repository: UsersService,
        private dialog: MatDialog,
        private errorService: ErrorHandlerService,
        form: FormBuilder) { }

    ngOnInit() {
        this.userForm = new FormGroup({
            id: new FormControl(''),
            login: new FormControl(''),
            userName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
            firstName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
            lastName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
            password: new FormControl('', [Validators.required, Validators.maxLength(60)]),
            enabled: new FormControl(''),
            email: new FormControl(''),
        });

        this.dialogConfig = {
            height: '200px',
            width: '400px',
            disableClose: true,
            data: {}
        };
    }

    public hasError = (controlName: string, errorName: string) => {
        return this.userForm.controls[controlName].hasError(errorName);
    }

    public onCancel = () => {
        this.location.back();
    }

    public createUser = (userFormValue) => {
        if (this.userForm.valid) {
            this.executeUserCreation(userFormValue);
        }
    }

    private executeUserCreation = (userFormValue) => {
        const user: User = {
            id: userFormValue.id,
            login: userFormValue.login,
            userName: userFormValue.userName,
            firstName: userFormValue.firstName,
            lastName: userFormValue.lastName,
            password: userFormValue.password,
            enabled: userFormValue.enabled,
            email: userFormValue.email,
            bio: userFormValue.bio,
            image: userFormValue.image,
        };

        const apiUrl = 'users';
        this.repository.create(apiUrl, user)
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
