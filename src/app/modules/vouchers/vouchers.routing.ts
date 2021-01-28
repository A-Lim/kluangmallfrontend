import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'app/core/guards/auth.guard';
import { PermissionGuard } from 'app/core/guards/permission.guard';
import { VouchersListComponent } from 'app/modules/vouchers/vouchers-list/vouchers-list.component';
import { VouchersCreateComponent } from 'app/modules/vouchers/vouchers-create/vouchers-create.component';
import { VouchersEditComponent } from 'app/modules/vouchers/vouchers-edit/vouchers-edit.component';

const routes: Routes = [
  { 
    path: '', 
    component: VouchersListComponent, 
    canActivate: [AuthGuard, PermissionGuard],
    data: { 
      breadcrumb: 'vouchers',
      permissions: ['events.viewAny']
    },
  },
  {
    path: 'create',
    component: VouchersCreateComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { 
      breadcrumb: 'create voucher',
      permissions: ['vouchers.create']
    },
  },
  {
    path: ':id',
    component: VouchersEditComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { 
      breadcrumb: 'edit voucher',
      permissions: ['vouchers.view', 'vouchers.viewAny', 'vouchers.update']
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VouchersRoutingModule { }
