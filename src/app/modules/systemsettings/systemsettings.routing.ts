import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'app/core/guards/auth.guard';
import { SystemSettingsComponent } from './systemsettings.component';
import { PermissionGuard } from 'app/core/guards/permission.guard';

const routes: Routes = [
  { 
    path: '', 
    component: SystemSettingsComponent, 
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permissions: ['systemsettings.viewAny'],
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemSettingsRoutingModule { }
