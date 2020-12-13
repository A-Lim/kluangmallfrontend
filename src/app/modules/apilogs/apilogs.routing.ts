import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'app/core/guards/auth.guard';
import { PermissionGuard } from 'app/core/guards/permission.guard';
import { ApiLogsListComponent } from 'app/modules/apilogs/apilogs-list/apilogs-list.component';

const routes: Routes = [
  { 
    path: '', 
    component: ApiLogsListComponent, 
    canActivate: [AuthGuard, PermissionGuard],
    data: { 
      breadcrumb: 'apilogs',
      // permissions: ['events.view', 'events.viewAny', 'events.update']
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApiLogsRoutingModule { }
