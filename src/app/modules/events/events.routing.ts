import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'app/core/guards/auth.guard';
import { PermissionGuard } from 'app/core/guards/permission.guard';
import { EventsCreateComponent } from 'app/modules/events/events-create/events-create.component';
import { EventsListComponent } from 'app/modules/events/events-list/events-list.component';
import { EventsEditComponent } from 'app/modules/events/events-edit/events-edit.component';

const routes: Routes = [
  { 
    path: '', 
    component: EventsListComponent, 
    canActivate: [AuthGuard, PermissionGuard],
    data: { 
      breadcrumb: 'events',
      permissions: ['events.view', 'events.viewAny', 'events.update']
    },
  },
  { 
    path: 'create', 
    component: EventsCreateComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { 
      breadcrumb: 'create events',
      permissions: ['events.create']
    },
  },
  { 
    path: ':id', 
    component: EventsEditComponent, 
    canActivate: [AuthGuard, PermissionGuard],
    data: { 
      breadcrumb: 'edit events',
      permissions: ['events.view', 'events.viewAny', 'events.update'],
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
