import { Injectable } from '@angular/core';

import * as AppUtils from './../../utils/app.utils';

@Injectable()
export class JwtService {

  getToken(): String {
    // return window.localStorage['jwtToken'];
    return window.localStorage[AppUtils.STORAGE_SECURITY_TOKEN];

}

  saveToken(token: String) {
    // window.localStorage['jwtToken'] = token;
    window.localStorage[AppUtils.STORAGE_SECURITY_TOKEN] = token;

}

  destroyToken() {
    // window.localStorage.removeItem('jwtToken');
   window.localStorage.removeItem(AppUtils.STORAGE_SECURITY_TOKEN);

}

}
