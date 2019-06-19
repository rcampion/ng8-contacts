import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Profile } from '../core';

import { User } from '../core/models/user';

import { UsersService } from '../core/services/users.service';

import { concatMap ,  tap } from 'rxjs/operators';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UsersService
  ) { }

  profile: Profile;
  currentUser: User;
  isUser: boolean;

  ngOnInit() {
    this.route.data.pipe(
      concatMap((data: { profile: Profile }) => {
        this.profile = data.profile;
        // Load the current user's data.
        return this.userService.currentUser.pipe(tap(
          (userData: User) => {
            this.currentUser = userData;
            this.isUser = (this.currentUser.userName === this.profile.userName);
          }
        ));
      })
    ).subscribe();
  }

  onToggleFollowing(following: boolean) {
    this.profile.following = following;
  }

}
