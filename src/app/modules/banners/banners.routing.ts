import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'app/core/guards/auth.guard';
import { PermissionGuard } from 'app/core/guards/permission.guard';
import { BannersCreateComponent } from 'app/modules/banners/banners-create/banners-create.component';
import { BannersListComponent } from 'app/modules/banners/banners-list/banners-list.component';
import { BannersEditComponent } from 'app/modules/banners/banners-edit/banners-edit.component';

const routes: Routes = [
  { 
    path: '', 
    component: BannersListComponent, 
    canActivate: [AuthGuard, PermissionGuard],
    data: { 
      breadcrumb: 'banners',
      permissions: ['banners.view', 'banners.viewAny', 'banners.update']
    },
  },
  { 
    path: 'create/users', 
    component: BannersCreateComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { 
      app: 'user',
      breadcrumb: 'create banners',
      permissions: ['banners.create']
    },
  },
  { 
    path: 'create/merchants', 
    component: BannersCreateComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { 
      app: 'merchant',
      breadcrumb: 'create banners',
      permissions: ['banners.create']
    },
  },
  { 
    path: ':id', 
    component: BannersEditComponent, 
    canActivate: [AuthGuard, PermissionGuard],
    data: { 
      breadcrumb: 'edit banners',
      permissions: ['banners.view', 'banners.viewAny', 'banners.update'],
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BannersRoutingModule { }
