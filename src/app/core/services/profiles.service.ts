import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Profile } from '../models';
import { map } from 'rxjs/operators';

@Injectable()
export class ProfilesService {
  constructor (
    private apiService: ApiService
  ) {}

  get(userName: string): Observable<Profile> {
    return this.apiService.get('/profiles/' + userName)
      .pipe(map((data: {profile: Profile}) => data.profile));
  }

  follow(userName: string): Observable<Profile> {
    return this.apiService.post('/profiles/' + userName + '/follow');
  }

  unfollow(userName: string): Observable<Profile> {
    return this.apiService.delete('/profiles/' + userName + '/follow');
  }

}
