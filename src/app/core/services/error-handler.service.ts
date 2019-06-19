import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { ErrorDialogComponent } from '../../shared/dialogs/error-dialog/error-dialog.component';
import { UsersService } from './users.service';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService {
    public errorMessage = '';
    public dialogConfig;

    constructor(private router: Router,
        private dialog: MatDialog,

        private usersService: UsersService) {

        this.dialogConfig = {
            height: '200px',
            width: '400px',
            disableClose: true,
            data: {}
        };
    }

    public handleError(error: HttpErrorResponse) {
        if (error.status === 500) {
            this.handle500Error(error);
        } else if (error.status === 404) {
            this.handle404Error(error);
        } else if (error.status === 403) {
            this.handle403Error(error);
        } else {
            this.handleOtherError(error);
        }
    }

    private handle500Error(error: HttpErrorResponse) {
        this.createErrorMessage(error);
        this.router.navigate(['/500']);
    }

    private handle404Error(error: HttpErrorResponse) {
        this.createErrorMessage(error);
        this.router.navigate(['/404']);
    }

    private handle403Error(error: HttpErrorResponse) {
        if (error.error === 'No jwt cookie found') {
            this.errorMessage = 'No jwt cookie found';
            this.usersService.logout();
            this.router.navigate(['/login']);
        } else if (error.error === 'The Json Web Token is expired') {
            this.errorMessage = 'The Json Web Token is expired';
            this.usersService.logout();
            this.router.navigate(['/login']);
        } else if (error.error.includes('UserAlreadyExistException')) {
            this.errorMessage = 'User Already Exists!';
        } else {
            this.errorMessage = 'Unauthorized Request!';
        }

        this.dialogConfig.data = { 'errorMessage': this.errorMessage };
        this.dialog.open(ErrorDialogComponent, this.dialogConfig);
    }

    private handleOtherError(error: HttpErrorResponse) {
        this.createErrorMessage(error);
        this.dialogConfig.data = { 'errorMessage': this.errorMessage };
        this.dialog.open(ErrorDialogComponent, this.dialogConfig);
    }

    public handleTextError(error) {
        this.errorMessage = error;
        this.dialogConfig.data = { 'errorMessage': this.errorMessage };
        this.dialog.open(ErrorDialogComponent, this.dialogConfig);
        if ((this.errorMessage === 'No jwt cookie found') ||
        (this.errorMessage === 'The Json Web Token is expired')) {
            this.usersService.logout();
            this.router.navigate(['/login']);
        }
    }

    private createErrorMessage(error: HttpErrorResponse) {
        this.errorMessage = error.error ? error.error : error.message;
        // this.errorMessage = error.statusText;
    }



}
