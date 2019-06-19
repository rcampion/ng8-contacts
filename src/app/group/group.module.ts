import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupRoutingModule } from './group-routing/group-routing.module';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { GroupDataComponent } from './group-details/group-data/group-data.component';
import { GroupCreateComponent } from './group-create/group-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { GroupUpdateComponent } from './group-update/group-update.component';
import { GroupDeleteDialogComponent } from './group-delete/group-delete-dialog.component';
import { GroupMemberListComponent } from './group-details/group-member/group-member-list/group-member-list.component';
// tslint:disable-next-line:max-line-length
import { GroupMemberSelectionDialogComponent } from './group-details/group-member/group-member-selection-dialog/group-member-selection-dialog.component';
// tslint:disable-next-line:max-line-length
import { GroupMemberSelectionListComponent } from './group-details/group-member/group-member-selection-list/group-member-selection-list.component';

@NgModule({
  imports: [
    CommonModule,
    GroupRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  // tslint:disable-next-line:max-line-length
  declarations: [GroupListComponent, GroupDetailsComponent, GroupDataComponent, GroupCreateComponent, GroupUpdateComponent, GroupDeleteDialogComponent, GroupMemberListComponent, GroupMemberSelectionDialogComponent, GroupMemberSelectionListComponent],
    entryComponents: [
    GroupDeleteDialogComponent,
    GroupMemberSelectionDialogComponent

  ]
})
export class GroupModule { }
