import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'app/core/guards/auth.guard';
import { PermissionGuard } from 'app/core/guards/permission.guard';
import { AnnouncementsListComponent } from 'app/modules/announcements/announcements-list/announcements-list.component';
import { AnnouncementsCreateComponent } from 'app/modules/announcements/announcements-create/announcements-create.component';

const routes: Routes = [
  { 
    path: '', 
    component: AnnouncementsListComponent, 
    canActivate: [AuthGuard, PermissionGuard],
    data: { 
      breadcrumb: 'announcements',
      // permissions: ['announcements.view', 'announcements.viewAny', 'announcements.update']
    },
  },
  {
    path: 'create', 
    component: AnnouncementsCreateComponent, 
    canActivate: [AuthGuard, PermissionGuard],
    data: { 
      breadcrumb: 'announcements',
      // permissions: ['announcements.create']
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnouncementsRoutingModule { }
