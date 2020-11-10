import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { EventsRoutingModule } from 'app/modules/events/events.routing';
import { EventsCreateComponent } from 'app/modules/events/events-create/events-create.component';
import { EventsListComponent } from 'app/modules/events/events-list/events-list.component';
import { EventsEditComponent } from 'app/modules/events/events-edit/events-edit.component';

@NgModule({
  declarations: [
    EventsListComponent,
    EventsCreateComponent,
    EventsEditComponent,
  ],
  imports: [
    EventsRoutingModule,
    SharedModule,
  ],
})
export class EventsModule { }
