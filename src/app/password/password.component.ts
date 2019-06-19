import { Component, Inject, OnInit, AfterViewInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../core/services/users.service';
import { ErrorHandlerService } from '../core/services/error-handler.service';

import { User } from '../core/models/user';


@Component({
    selector: 'app-password',
    templateUrl: './password.component.html',
    styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
    userId: number;

    public user: User;

    public passwordForm: FormGroup;

    loginService: UsersService;

    error: string;

    // tslint:disable-next-line:max-line-length
    constructor(loginService: UsersService, private errorService: ErrorHandlerService, @Inject(Router) private router: Router, private activeRoute: ActivatedRoute, private dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) {

        this.loginService = loginService;

        this.userId = this.loginService.getUserId();
    }

    ngOnInit() {

        this.passwordForm = new FormGroup({
            id: new FormControl(''),
            login: new FormControl(''),
            userName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
            firstName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
            lastName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
            password: new FormControl('', [Validators.required, Validators.maxLength(60)]),
            enabled: new FormControl(''),
            authorities: new FormControl(''),
            authoritiesList: new FormControl(''),
        });

        this.getUserDetails();
    }

    private getUserDetails = () => {
        const id = this.userId;
        const apiUrl = `users/${id}`;

        this.loginService.getData(apiUrl)
            .subscribe(res => {
                this.user = res as User;
                this.populateForm();
            },
                (error) => {
                    this.errorService.handleError(error);
                });
    }

    private populateForm() {
        this.passwordForm.controls['userName'].setValue(this.user.userName);
        /*
                this.userForm.controls['id'].setValue(this.user.id);
                this.userForm.controls['login'].setValue(this.user.login);
                this.userForm.controls['userName'].setValue(this.user.userName);
                this.userForm.controls['firstName'].setValue(this.user.firstName);
                this.userForm.controls['lastName'].setValue(this.user.lastName);
                this.userForm.controls['enabled'].setValue(this.user.enabled);
        */
        // const authority = this.user.authorities[0];
        //        this.userForm.controls['authorities'].setValue(this.user.authorities);


    }

    changePassword() {
        // event.preventDefault();
        try {
            this.loginService.changePassword(this.passwordForm.value.userName, this.passwordForm.value.password)

                .subscribe(account => {

                    console.log('Successfully changed password.', account);
                    this.loginService.logout();
                    this.router.navigateByUrl('/login');
                },

                    (err) => this.error = err); // Reach here if fails;

        } catch (e) {
            console.log(e);
        }
    }
}
