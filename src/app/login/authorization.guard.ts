import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { UsersService } from '../core/services/users.service';

@Injectable()
export class AuthorizationRouteGuard implements CanActivate {

    constructor(private router: Router, private loginService: UsersService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.loginService.isUserAuthenticated() &&
            this.loginService.isAuthorized(['ROLE_ADMIN'])) {
            return true;
        } else {
            this.router.navigate(['/login'], {
                queryParams: {
                    return: state.url
                }
            });
        }
        return false;
    }
}
