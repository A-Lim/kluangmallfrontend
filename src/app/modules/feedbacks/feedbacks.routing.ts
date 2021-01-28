import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'app/core/guards/auth.guard';
import { PermissionGuard } from 'app/core/guards/permission.guard';
import { FeedbacksListComponent } from 'app/modules/feedbacks/feedbacks-list/feedbacks-list.component';

const routes: Routes = [
  { 
    path: '', 
    component: FeedbacksListComponent, 
    canActivate: [AuthGuard, PermissionGuard],
    data: { 
      breadcrumb: 'feedbacks',
      permissions: ['feedbacks.view', 'feedbacks.viewAny']
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbacksRoutingModule { }
