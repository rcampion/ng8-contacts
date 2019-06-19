import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PaginationPage, PaginationPropertySort } from '../interface/pagination';
import { map, catchError } from 'rxjs/operators';
import { Contact } from '../interface/contact.model';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
    providedIn: 'root'
})
export class ContactsService {
    paginationPage: Object;
    total = 0;

    constructor(private http: HttpClient,
        private errorService: ErrorHandlerService) { }

    public getData = (route: string) => {
        return this.http.get(this.createCompleteRoute(route, environment.api_url));
    }
    // , headers: this.generateHeaders()
    public getDataPage = (route: string, page: number, pageSize: number, sort: PaginationPropertySort) => {
        // , responseType: 'application/json'
        const params: any = { page: page, size: pageSize, headers: this.generateHeaders(), observe: 'body' };
        if (sort != null) {
            params.sort = sort.property + ',' + sort.direction;
        }
        return this.http.get<PaginationPage<any>>(this.createCompleteRoute(route, environment.api_url), params);
        //        return this.http.get(this.createCompleteRoute(route, environment.api_url), params);
    }

    public create = (route: string, body) => {
        return this.http.post(this.createCompleteRoute(route, environment.api_url), body, this.generateHeaders());
    }

    public update = (route: string, body) => {
        return this.http.put(this.createCompleteRoute(route, environment.api_url), body, this.generateHeaders());
    }

    public delete = (route: string) => {
        return this.http.delete(this.createCompleteRoute(route, environment.api_url), this.generateHeaders());
    }

    private createCompleteRoute = (route: string, envAddress: string) => {
        return `${envAddress}/${route}`;
    }

    private generateHeaders() {
        return {

            headers: new HttpHeaders(
                {
                    'Content-Type': 'application/json',
                })
        };
    }


    findContacts(

        filter = '', sortOrder = 'asc',
        pageNumber = 0, pageSize = 3): Observable<any> {
        const apiUrl = this.createCompleteRoute('contact', environment.api_url);

        return this.http.get(apiUrl, {
            params: new HttpParams()
                .set('filter', filter)
                .set('sort', sortOrder)
                .set('page', pageNumber.toString())
                .set('size', pageSize.toString())
        }).pipe(
            // map(res => res['content']
            map(res => res
            )
        );
    }

    findContactsWithSort(

        filter = '', sort: PaginationPropertySort,
        pageNumber = 0, pageSize = 3): Observable<any> {
        const apiUrl = this.createCompleteRoute('contact', environment.api_url);
        const paramsx: any = { page: pageNumber, size: pageSize };
        if (sort != null) {
            paramsx.sort = sort.property + ',' + sort.direction;
        }
        // const sortTest = 'firstName' + '\&' + 'firstName.dir=desc';
        // const sortTestEncoded = encodeURIComponent(sortTest);
        let sortTest = sort.direction;
        if (sort.property !== '') {
            sortTest = sort.property + ',' + sort.direction;
        }
        return this.http.get(apiUrl, {
            params: new HttpParams()

                .set('search', filter)

                .set('sort', sortTest)

                .set('page', pageNumber.toString())
                .set('size', pageSize.toString())

        }).pipe(
            // map(res => res['content']
            map(res => res
            )
        );
    }

    findContactsWithSortAndFilter(

        filter = '', sort: PaginationPropertySort,
        pageNumber = 0, pageSize = 3): Observable<any> {
        let apiUrl = this.createCompleteRoute('contact', environment.api_url);
        const paramsx: any = { page: pageNumber, size: pageSize };
        if (sort != null) {
            paramsx.sort = sort.property + ',' + sort.direction;
        }
        // const sortTest = 'firstName' + '\&' + 'firstName.dir=desc';
        // const sortTestEncoded = encodeURIComponent(sortTest);
        let sortTest = sort.direction;
        if (sort.property !== '') {
            sortTest = sort.property + ',' + sort.direction;
        }
        let search: string;
        if (filter !== '') {
            apiUrl = this.createCompleteRoute('contact/search', environment.api_url);
            // search = 'firstName==' + filter + '* or ' + 'lastName==' + filter + '*';
            // search = 'lastName==' + filter + '*';
            search = 'firstName==' + filter + '* or ' + 'lastName==' + filter + '* or ' + 'company==' + filter + '*';
        }
        return this.http.get(apiUrl, {
            params: new HttpParams()

                .set('search', search)

                .set('sort', sortTest)

                .set('page', pageNumber.toString())
                .set('size', pageSize.toString())

        }).pipe(
            // map(res => res['content']
            map(res => res),
            catchError(error => { this.errorService.handleError(error); return Observable.throw(error.statusText); })
        );
    }

    findUserContactsWithSortAndFilter(
        userId = 0,
        filter = '', sort: PaginationPropertySort,
        pageNumber = 0, pageSize = 3): Observable<any> {

        const id: number = userId;
        const buildApiUrl = 'user/contacts/' + id;
        let apiUrl = this.createCompleteRoute(buildApiUrl, environment.api_url);
        const paramsx: any = { page: pageNumber, size: pageSize };
        if (sort != null) {
            paramsx.sort = sort.property + ',' + sort.direction;
        }

        let sortTest = sort.direction;
        if (sort.property !== '') {
            sortTest = sort.property + ',' + sort.direction;
        }
        let search: string;
        if (filter !== '') {
            apiUrl = this.createCompleteRoute('contact/search', environment.api_url);
            // search = 'firstName==' + filter + '* or ' + 'lastName==' + filter + '*';
            // search = 'lastName==' + filter + '*';
            search = 'firstName==*' + filter + '* or ' + 'lastName==*' + filter + '* or ' + 'company==*' + filter + '*';
        }
        return this.http.get(apiUrl, {
            params: new HttpParams()

                .set('search', search)

                .set('sort', sortTest)

                .set('page', pageNumber.toString())
                .set('size', pageSize.toString())

        })
            .pipe(
                // map(res => res['content']
                map(res => res),
                catchError(error => { this.errorService.handleError(error); return Observable.throw(error.statusText); })
            );
    }
}
