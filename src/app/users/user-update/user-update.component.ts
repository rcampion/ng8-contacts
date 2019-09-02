import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../core/models/user';
import { UsersService } from '../../core/services/users.service';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '../../core/services/error-handler.service';

@Component({
    selector: 'app-group-update',
    templateUrl: './user-update.component.html',
    styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
    public user: User;
    public userForm: FormGroup;

    private dialogConfig;

    // tslint:disable-next-line:max-line-length
    constructor(private location: Location, private repository: UsersService, private dialog: MatDialog,
        router: Router,
        private activeRoute: ActivatedRoute, private errorService: ErrorHandlerService) { }


    ngOnInit() {

        this.userForm = new FormGroup({
            id: new FormControl(''),
            login: new FormControl(''),
            userName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
            firstName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
            lastName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
            password: new FormControl('', [Validators.required, Validators.maxLength(60)]),
            enabled: new FormControl(''),
            authorities: new FormControl(''),
            // authoritiesList: new FormControl(''),
            email: new FormControl(''),
            bio: new FormControl(''),
            image: new FormControl(''),
        });

        this.dialogConfig = {
            height: '200px',
            width: '400px',
            disableClose: true,
            data: {}
        };

        this.getUserDetails();


    }
    private getUserDetails = () => {
        const id: string = this.activeRoute.snapshot.params['id'];
        const apiUrl = `users/${id}`;

        this.repository.getData(apiUrl)
            .subscribe(res => {
                this.user = res as User;
                this.populateForm();
            },
                (error) => {
                    this.errorService.handleError(error);
                });
    }

    private populateForm() {
        this.userForm.controls['id'].setValue(this.user.id);
        this.userForm.controls['login'].setValue(this.user.login);
        this.userForm.controls['userName'].setValue(this.user.userName);
        this.userForm.controls['firstName'].setValue(this.user.firstName);
        this.userForm.controls['lastName'].setValue(this.user.lastName);
        this.userForm.controls['enabled'].setValue(this.user.enabled);
        this.userForm.controls['email'].setValue(this.user.email);
        this.userForm.controls['bio'].setValue(this.user.bio);
        this.userForm.controls['image'].setValue(this.user.image);
    }

    public updateUser = (userFormValue) => {
        if (this.userForm.valid) {
            this.executeUserUpdate(userFormValue);
        }
    }

    private executeUserUpdate = (userFormValue) => {
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
        this.repository.update(apiUrl, user)
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
        return this.userForm.controls[controlName].hasError(errorName);
    }

    public onCancel = () => {
        this.location.back();
    }

}
