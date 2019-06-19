import * as _ from 'lodash';
import { Authority } from './authority';

export class Account {
  id: number;
  login: string;
  profile: string;
  authorities: Array<Authority>;
  authoritiesStringArray: Array<String>;
  authenticated = false;
  constructor(account?: { id: number, login: string, profile: string, authorities: Array<string> }) {
    if (account) {
      _.assignIn(this, account);
      this.authenticated = false;
    }
  }
}
