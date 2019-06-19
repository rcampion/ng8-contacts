import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { UsersService } from '../services/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UsersService
  ) {}
/*
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    // return this.userService.isAuthenticated.pipe(take(1));
    return this.userService.isUserAuthenticated();

  }
  */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {

    // return this.userService.isAuthenticated.pipe(take(1));
    return this.userService.isUserAuthenticated();

  }

}
