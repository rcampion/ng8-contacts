import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

// import { MatToolbarModule } from '@angular/material';
import { User } from '../../core/models/user';

import { UsersService } from '../../core/services/users.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    userService: UsersService;
    @Output() public sidenavToggle = new EventEmitter();
    currentUser: User;
    constructor(router: Router, userService: UsersService) {
        this.userService = userService;

    }

    ngOnInit() {
        this.userService.currentUser.subscribe(
            (userData) => {
                this.currentUser = userData;
            }
        );
    }


    public onToggleSidenav = () => {
        this.sidenavToggle.emit();
    }

    logout(): void {
        this.userService.logout();
    }
}
