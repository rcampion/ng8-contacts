import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { UsersService } from '../core/services/users.service';
import { Account } from '../core/models/account';
import { AccountEventsService } from '../core/services/account.events.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [UsersService]
})
export class LoginComponent implements OnInit {
    userName: string;
    password: string;
    // router: Router;
    wrongCredentials: boolean;
    loginForm: FormGroup;
    loginService: UsersService;
    account: Account;
    error: string;
    return: string;


    constructor(
        private router: Router,
        private route: ActivatedRoute,
        form: FormBuilder,
        loginService: UsersService,
        accountEventService: AccountEventsService) {
        this.wrongCredentials = false;
        this.loginService = loginService;
        this.loginForm = form.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });

        accountEventService.subscribe((account) => {
            if (!account.authenticated) {
                if (account.error) {
                    if (account.error.indexOf('Unauthorized') !== -1) {
                        this.error = 'Username and/or password are invalid !';
                        // this.account.authenticated = false;
                    } else {
                        this.error = account.error;
                    }
                }
            }
        },
            (error: any) => {
                console.log('Username and/or password are invalid !');
                this.error = 'Username and/or password are invalid !';
            });
    }

    ngOnInit() {
        this.route.queryParams.subscribe(
            params => this.return = params['return'] || '/contacts');
    }

    authenticate() {
        // event.preventDefault();
        try {
            this.loginService.authenticate(this.loginForm.value.userName, this.loginForm.value.password)

                .subscribe(account => {
                    this.account = account;
                    console.log('Successfully logged in.', account);
                    this.account.authenticated = true;
                    this.router.navigateByUrl('/home');
                    window.location.href = '/contacts/home';
                    // window.location.reload();
                },

                    (err) => this.error = err); // Reach here if fails;

        } catch (e) {
            console.log(e);
        }
    }
    getUserName() {
        return this.loginForm.get('userName');
    }

}
