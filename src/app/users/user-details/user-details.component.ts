import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../core/models/user';
import { UsersService } from '../../core/services/users.service';
import { ErrorHandlerService } from '../../core/services/error-handler.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  public user: User;
  public showAccounts;

  constructor(private repository: UsersService, private router: Router,
    private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.getUserDetails();
  }

  private getUserDetails = () => {
    const id: string = this.activeRoute.snapshot.params['id'];
    const apiUrl = `users/${id}`;

    this.repository.getData(apiUrl)
    .subscribe(res => {
      this.user = res as User;
    },
    (error) => {
      this.errorHandler.handleError(error);
    });
  }
}
