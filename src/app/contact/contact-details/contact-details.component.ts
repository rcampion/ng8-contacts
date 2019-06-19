import { Component, OnInit } from '@angular/core';
import { Contact } from '../../core/interface/contact.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactsService } from '../../core/services/contacts.service';

import { ErrorHandlerService } from '../../core/services/error-handler.service';


@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  public contact: Contact;
  public showAccounts;

  constructor(private repository: ContactsService, private router: Router,
    private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.getContactDetails();
  }

  private getContactDetails = () => {
    const id: string = this.activeRoute.snapshot.params['id'];
    const apiUrl = `contact/${id}`;

    this.repository.getData(apiUrl)
    .subscribe(res => {
      this.contact = res as Contact;
    },
    (error) => {
      this.errorHandler.handleError(error);
    });
  }
}
