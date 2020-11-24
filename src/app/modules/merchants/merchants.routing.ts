import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'app/core/guards/auth.guard';
import { PermissionGuard } from 'app/core/guards/permission.guard';
import { MerchantsListComponent } from 'app/modules/merchants/merchants-list/merchants-list.component';
import { MerchantsEditComponent } from 'app/modules/merchants/merchants-edit/merchants-edit.component';
import { MerchantsCreateComponent } from 'app/modules/merchants/merchants-create/merchants-create.component';

const routes: Routes = [
  { 
    path: '', 
    component: MerchantsListComponent, 
    canActivate: [AuthGuard, PermissionGuard],
    data: { 
      breadcrumb: 'merchants',
      // permissions: ['merchants.view', 'merchants.viewAny', 'merchants.update']
    },
  },
  { 
    path: 'create', 
    component: MerchantsCreateComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { 
      breadcrumb: 'create merchant',
      // permissions: ['merchants.create']
    },
  },
  { 
    path: ':id', 
    component: MerchantsEditComponent, 
    canActivate: [AuthGuard, PermissionGuard],
    data: { 
      breadcrumb: 'edit merchant',
      // permissions: ['merchants.view', 'merchants.viewAny', 'merchants.update'],
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantsRoutingModule { }
