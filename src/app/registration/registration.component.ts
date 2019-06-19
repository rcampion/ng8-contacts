import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { RegistrationService } from '../core/services/registration.service';
import { MatDialog } from '@angular/material';
import { SuccessDialogComponent } from './../shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '../core/services/error-handler.service';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

    userForm: FormGroup;

    private dialogConfig;

    registrationService: RegistrationService;

    error: string;

    constructor(
        private location: Location,
        private dialog: MatDialog,
        private errorService: ErrorHandlerService,
        registrationService: RegistrationService,
        form: FormBuilder) {
        this.userForm = form.group({
            userName: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.registrationService = registrationService;
    }

    ngOnInit() {
        this.dialogConfig = {
            height: '200px',
            width: '400px',
            disableClose: true,
            data: {}
        };
    }

    register() {
        // event.preventDefault();
        try {
            this.registrationService.register(
                this.userForm.value.userName,
                this.userForm.value.firstName,
                this.userForm.value.lastName,
                this.userForm.value.password)

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

        } catch (e) {
            console.log(e);
        }
    }
}
