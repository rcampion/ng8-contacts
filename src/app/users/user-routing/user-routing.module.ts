import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from '../users-list/users-list.component';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { UserCreateComponent } from '../user-create/user-create.component';
import { UserUpdateComponent } from '../user-update/user-update.component';

const routes: Routes = [
    { path: 'users', component: UsersListComponent },
    { path: 'details/:id', component: UserDetailsComponent },
    { path: 'create', component: UserCreateComponent },
    { path: 'update/:id', component: UserUpdateComponent }
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
export class UserRoutingModule { }
