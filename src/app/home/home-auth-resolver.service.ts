import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { UsersService } from '../core/services/users.service';

@Injectable()
export class HomeAuthResolver implements Resolve<boolean> {
  constructor(
    private router: Router,
    private userService: UsersService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {

    return this.userService.isUserAuthenticated();

  }
}
