import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { User } from './../models/user';

@Injectable()

export class RegistrationService {
    user: User = new User();

    constructor(private http: HttpClient) { }

    register(userName: string, firstName: string, lastName: string, password: string) {

        const headers = new HttpHeaders(
            {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials': 'true'
            }
        );

        // tslint:disable-next-line:max-line-length
        // return this.http.post(AppUtils.BACKEND_API_ROOT_URL + AppUtils.BACKEND_API_AUTHENTICATE_PATH, JSON.stringify({ login: userName, password: password }), {
        const route = 'user/registration';
        return this.http.post(this.createCompleteRoute(route, environment.api_url),
            JSON.stringify({ userName: userName, firstName: firstName, lastName: lastName, password: password }), {
                headers: headers,
                observe: 'response'
            });
        }

    private createCompleteRoute = (route: string, envAddress: string) => {
        return `${envAddress}/${route}`;
    }
}
