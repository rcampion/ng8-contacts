import { CanActivate , Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Injectable } from '@angular/core';
import { UsersService } from '../core/services/users.service';

@Injectable()
export class LoginRouteGuard implements CanActivate {

  constructor(private router: Router, private loginService: UsersService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.loginService.isUserAuthenticated()) {
        return true;
    } else {
        this.router.navigate(['/authenticate'], {
             queryParams: {
                 return: state.url
             }
        });
    }
    return false;
  }
}
