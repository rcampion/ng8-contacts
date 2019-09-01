import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Account } from './../models/account';
import { ErrorDialogComponent } from '../../shared/dialogs/error-dialog/error-dialog.component';

import * as AppUtils from '../../utils/app.utils';
import { JwtService } from './jwt.service';
import { ApiService } from './api.service';
import { AccountEventsService } from './account.events.service';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService {
    public errorMessage = '';
    public dialogConfig;

    constructor(private http: HttpClient,
                private apiService: ApiService,

        private jwtService: JwtService,

        private accountEventService: AccountEventsService,

        private router: Router,
        
        private dialog: MatDialog
        
        ) {

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
            this.logout();
            this.router.navigate(['/login']);
        } else if (error.error === 'The Json Web Token is expired') {
            this.errorMessage = 'The Json Web Token is expired';
            this.logout();
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
            this.logout();
            this.router.navigate(['/login']);
        }
    }

    private createErrorMessage(error: HttpErrorResponse) {
        this.errorMessage = error.error ? error.error : error.message;
        // this.errorMessage = error.statusText;
    }

    logout(callServer: boolean = true): void {
        console.log('Logging out');
        const headers = new HttpHeaders(
            {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials': 'true'
            }
        );
        if (callServer) {
            const route = 'logout';
            this.http.get(this.createCompleteRoute(route, environment.api_url), {
                headers: headers,
                observe: 'response'
            }).subscribe(() => {
                this.accountEventService.logout(new Account(JSON.parse(localStorage.getItem(AppUtils.STORAGE_ACCOUNT_TOKEN))));
                this.removeAccount();
                this.purgeAuth();
                this.router.navigate(['/about']);
                window.location.reload();
            });
        } else {
            this.removeAccount();
            this.purgeAuth();
            this.router.navigate(['/about']);
        }
        this.purgeAuth();
    }

    removeAccount(): void {
        localStorage.removeItem(AppUtils.STORAGE_ACCOUNT_TOKEN);
        localStorage.removeItem(AppUtils.STORAGE_SECURITY_TOKEN);
        localStorage.removeItem(AppUtils.CSRF_CLAIM_HEADER);
    }

    purgeAuth() {
        // Remove JWT from localstorage
        this.jwtService.destroyToken();
        // Set current user to an empty object
        //this.currentUserSubject.next({} as User);
        // Set auth status to false
        //this.isAuthenticatedSubject.next(false);

        // this.commonService.refresh();

    }

    private createCompleteRoute = (route: string, envAddress: string) => {
        return `${envAddress}/${route}`;
    }
}
