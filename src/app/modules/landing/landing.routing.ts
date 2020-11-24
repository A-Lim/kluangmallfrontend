import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'app/core/guards/auth.guard';
import { PermissionGuard } from 'app/core/guards/permission.guard';
import { LandingManagementComponent } from 'app/modules/landing/landing-management/landing-management.component';

const routes: Routes = [
  { 
    path: '', 
    component: LandingManagementComponent, 
    canActivate: [AuthGuard, PermissionGuard],
    data: { 
      breadcrumb: 'landing',
      permissions: ['landing.viewAny', 'landing.update']
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
