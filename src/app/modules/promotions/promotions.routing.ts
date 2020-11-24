import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'app/core/guards/auth.guard';
import { PermissionGuard } from 'app/core/guards/permission.guard';
import { PromotionsCreateComponent } from 'app/modules/promotions/promotions-create/promotions-create.component';
import { PromotionsListComponent } from 'app/modules/promotions/promotions-list/promotions-list.component';
import { PromotionsEditComponent } from 'app/modules/promotions/promotions-edit/promotions-edit.component';

const routes: Routes = [
  { 
    path: '', 
    component: PromotionsListComponent, 
    canActivate: [AuthGuard, PermissionGuard],
    data: { 
      breadcrumb: 'promotions',
      permissions: ['promotions.view', 'promotions.viewAny', 'promotions.update']
    },
  },
  { 
    path: 'create', 
    component: PromotionsCreateComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { 
      breadcrumb: 'create promotions',
      permissions: ['promotions.create']
    },
  },
  { 
    path: ':id', 
    component: PromotionsEditComponent, 
    canActivate: [AuthGuard, PermissionGuard],
    data: { 
      breadcrumb: 'edit promotions',
      permissions: ['users.view', 'users.viewAny', 'users.update'],
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromotionsRoutingModule { }
