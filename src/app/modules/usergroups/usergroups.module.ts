import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { UserGroupsRoutingModule } from 'app/modules/usergroups/usergroups.routing';
import { UserGroupsListComponent } from 'app/modules/usergroups/usergroups-list/usergroups-list.component';

import { UserGroupsCreateComponent } from 'app/modules/usergroups/usergroups-create/usergroups-create.component';
import { UserGroupsCreateGeneralTabComponent } from 'app/modules/usergroups/usergroups-create/usergroups-create-general-tab/usergroups-create-general-tab.component';
import { UserGroupsCreateUsersTabComponent } from 'app/modules/usergroups/usergroups-create/usergroups-create-users-tab/usergroups-create-users-tab.component';

import { UserGroupsEditComponent } from 'app/modules/usergroups/usergroups-edit/usergroups-edit.component';
import { UserGroupsEditGeneralTabComponent } from './usergroups-edit/usergroups-edit-general-tab/usergroups-edit-general-tab.component';
import { UserGroupsEditUsersTabComponent } from './usergroups-edit/usergroups-edit-users-tab/usergroups-edit-users-tab.component';

// Validators
import { UserGroupCodeInUseValidator } from 'app/modules/usergroups/validators/usergroupcodeinuse.validator';


@NgModule({
  declarations: [
    UserGroupsListComponent,
    UserGroupsEditComponent,

    UserGroupsCreateComponent,
    UserGroupsCreateGeneralTabComponent,
    UserGroupsCreateUsersTabComponent,

    UserGroupsEditComponent,
    UserGroupsEditGeneralTabComponent,
    UserGroupsEditUsersTabComponent,

    UserGroupCodeInUseValidator,
  ],
  imports: [
    UserGroupsRoutingModule,
    SharedModule,
  ],
})
export class UserGroupsModule { }
