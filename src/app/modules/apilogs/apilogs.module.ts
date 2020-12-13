import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { ApiLogsRoutingModule } from 'app/modules/apilogs/apilogs.routing';
import { ApiLogsListComponent } from 'app/modules/apilogs/apilogs-list/apilogs-list.component';
import { ApiLogDetailsModalComponent } from 'app/modules/apilogs/modals/apilogs-details/modal-apilog-details.component';

@NgModule({
  declarations: [
    ApiLogsListComponent,
    ApiLogDetailsModalComponent
  ],
  imports: [
    ApiLogsRoutingModule,
    SharedModule,
  ],
})
export class ApiLogsModule { }
