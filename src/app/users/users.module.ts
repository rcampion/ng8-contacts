import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { UserRoutingModule } from './user-routing/user-routing.module';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserDataComponent } from './user-details/user-data/user-data.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UserDeleteDialogComponent } from './user-delete/user-delete-dialog.component';
import { UserAuthoritiesListComponent } from './user-details/user-authorities/user-authorities-list/user-authorities-list.component';

// tslint:disable-next-line:max-line-length
import { UserAuthoritiesUpdateDialogComponent } from './user-details/user-authorities/user-authorities-update-dialog/user-authorities-update-dialog.component';
// tslint:disable-next-line:max-line-length
import { UserAuthoritiesCreateDialogComponent } from './user-details/user-authorities/user-authorities-create-dialog/user-authorities-create-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        UserRoutingModule,
        ReactiveFormsModule,
        SharedModule
    ],
    // tslint:disable-next-line:max-line-length
    declarations: [UsersListComponent,
        UserDetailsComponent,
        UserDataComponent,
        UserCreateComponent,
        UserUpdateComponent,
        UserDeleteDialogComponent,
        UserAuthoritiesListComponent,
        UserAuthoritiesUpdateDialogComponent,
        UserAuthoritiesCreateDialogComponent],
    entryComponents: [
        UserDeleteDialogComponent,
        UserAuthoritiesUpdateDialogComponent,
        UserAuthoritiesCreateDialogComponent

    ]
})
export class UsersModule { }
