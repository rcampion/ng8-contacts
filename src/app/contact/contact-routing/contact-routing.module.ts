import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ContactListComponent } from '../contact-list/contact-list.component';
import { ContactDetailsComponent } from '../contact-details/contact-details.component';
import { ContactCreateComponent } from '../contact-create/contact-create.component';
import { ContactUpdateComponent } from '../contact-update/contact-update.component';

const routes: Routes = [
    { path: 'contacts', component: ContactListComponent },
    { path: 'details/:id', component: ContactDetailsComponent },
    { path: 'create', component: ContactCreateComponent },
    { path: 'update/:id', component: ContactUpdateComponent }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class ContactRoutingModule { }
