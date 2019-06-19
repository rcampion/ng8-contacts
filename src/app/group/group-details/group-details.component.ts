import { Component, OnInit } from '@angular/core';
import { Group } from '../../core/interface/group.model';
import { Router, ActivatedRoute } from '@angular/router';
import { GroupsService } from '../../core/services/groups.service';

import { ErrorHandlerService } from '../../core/services/error-handler.service';


@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit {
  public group: Group;
  public showAccounts;

  constructor(private repository: GroupsService, private router: Router,
    private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.getGroupDetails();
  }

  private getGroupDetails = () => {
    const id: string = this.activeRoute.snapshot.params['id'];
    const apiUrl = `group/${id}`;

    this.repository.getData(apiUrl)
    .subscribe(res => {
      this.group = res as Group;
    },
    (error) => {
      this.errorHandler.handleError(error);
    });
  }
}
