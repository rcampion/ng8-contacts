import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../core/services/users.service';

@Component({
    selector: 'app-sidenav-list',
    templateUrl: './sidenav-list.component.html',
    styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
    loginService: UsersService;
    @Output() sidenavClose = new EventEmitter();

    constructor(router: Router, loginService: UsersService) {
        this.loginService = loginService;

    }

    ngOnInit() {
    }

    public onSidenavClose = () => {
        this.sidenavClose.emit();
    }

    logout(): void {
        this.loginService.logout();
        this.sidenavClose.emit();
    }
}
