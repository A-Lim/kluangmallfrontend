import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'app/core/guards/auth.guard';
import { PermissionGuard } from 'app/core/guards/permission.guard';
import { UserGroupsListComponent } from 'app/modules/usergroups/usergroups-list/usergroups-list.component';
import { UserGroupsEditComponent } from 'app/modules/usergroups/usergroups-edit/usergroups-edit.component';
import { UserGroupsCreateComponent } from 'app/modules/usergroups/usergroups-create/usergroups-create.component';

const routes: Routes = [
  { 
    path: '', 
    component: UserGroupsListComponent, 
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      breadcrumb: 'user groups',
      permissions: ['usergroups.view', 'usergroups.viewAny'],
    }
  },
  { 
    path: 'create', 
    component: UserGroupsCreateComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { 
      breadcrumb: 'create user group',
      permissions: ['usergroups.create'],
    },
  },
  {
    path: ':id', 
    component: UserGroupsEditComponent, 
    canActivate: [AuthGuard, PermissionGuard],
    data: { 
      breadcrumb: 'edit user group',
      permissions: ['usergroups.view', 'usergroups.viewAny', 'usergroups.update'],
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserGroupsRoutingModule { }
