import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactRoutingModule } from './contact-routing/contact-routing.module';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { ContactDataComponent } from './contact-details/contact-data/contact-data.component';
import { AccountDataComponent } from './contact-details/account-data/account-data.component';
import { ContactCreateComponent } from './contact-create/contact-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ContactUpdateComponent } from './contact-update/contact-update.component';
import { ContactDeleteDialogComponent } from './contact-delete/contact-delete-dialog.component';
import { ContactEmailListComponent } from './contact-details/contact-email-list/contact-email-list.component';
import { ContactEmailUpdateDialogComponent } from './contact-details/contact-email-update-dialog/contact-email-update-dialog.component';
import { ContactEmailCreateDialogComponent } from './contact-details/contact-email-create-dialog/contact-email-create-dialog.component';
import { ContactPhoneListComponent } from './contact-details/contact-phone-list/contact-phone-list.component';
import { ContactPhoneCreateDialogComponent } from './contact-details/contact-phone-create-dialog/contact-phone-create-dialog.component';
import { ContactPhoneUpdateDialogComponent } from './contact-details/contact-phone-update-dialog/contact-phone-update-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    ContactRoutingModule,
    ReactiveFormsModule,
    SharedModule

  ],
  // tslint:disable-next-line:max-line-length
  declarations: [ContactListComponent, ContactDetailsComponent, ContactDataComponent, AccountDataComponent, ContactCreateComponent, ContactUpdateComponent, ContactEmailListComponent, ContactEmailUpdateDialogComponent, ContactEmailCreateDialogComponent, ContactPhoneListComponent, ContactPhoneCreateDialogComponent, ContactPhoneUpdateDialogComponent],
  entryComponents: [

    ContactEmailUpdateDialogComponent,
    ContactEmailCreateDialogComponent,
    ContactPhoneUpdateDialogComponent,
    ContactPhoneCreateDialogComponent
  ]

})
export class ContactModule { }
