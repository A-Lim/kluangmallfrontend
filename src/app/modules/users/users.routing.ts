import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'app/core/guards/auth.guard';
import { PermissionGuard } from 'app/core/guards/permission.guard';
import { UsersListComponent } from 'app/modules/users/users-list/users-list.component';
import { UsersCreateComponent } from 'app/modules/users/users-create/users-create.component';
import { UsersEditComponent } from 'app/modules/users/users-edit/users-edit.component';

const routes: Routes = [
  { 
    path: '', 
    component: UsersListComponent, 
    canActivate: [AuthGuard, PermissionGuard],
    data: { 
      breadcrumb: 'users',
      permissions: ['users.view', 'users.viewAny', 'users.update']
    },
    
  },
  { 
    path: 'create', 
    component: UsersCreateComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { 
      breadcrumb: 'create users',
      permissions: ['users.create']
    },
  },
  { 
    path: ':id', 
    component: UsersEditComponent, 
    canActivate: [AuthGuard, PermissionGuard],
    data: { 
      breadcrumb: 'edit users',
      permissions: ['users.view', 'users.viewAny', 'users.update'],
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
