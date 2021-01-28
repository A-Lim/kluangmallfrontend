import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'app/core/guards/auth.guard';
import { PermissionGuard } from 'app/core/guards/permission.guard';
import { LandingManagementComponent } from 'app/modules/landing/landing-management/landing-management.component';

const routes: Routes = [
  { 
    path: 'landing-user', 
    component: LandingManagementComponent, 
    canActivate: [AuthGuard, PermissionGuard],
    data: { 
      app: 'user',
      breadcrumb: 'user',
      permissions: ['userlanding.viewAny', 'userlanding.update']
    },
  },
  { 
    path: 'landing-merchant', 
    component: LandingManagementComponent, 
    canActivate: [AuthGuard, PermissionGuard],
    data: { 
      app: 'merchant',
      breadcrumb: 'merchant',
      permissions: ['merchantlanding.viewAny', 'merchantlanding.update']
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
