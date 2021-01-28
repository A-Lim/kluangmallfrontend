import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { SharedModule } from 'app/shared/shared.module';
import { DashboardRoutingModule } from 'app/modules/dashboard/dashboard.routing';
import { DashboardComponent } from 'app/modules/dashboard/dashboard.component'

import { WidgetGeneralComponent } from 'app/modules/dashboard/widget-general/widget-general.component';
import { WidgetNewUsersComponent } from 'app/modules/dashboard/widget-new-users/widget-new-users.component';
import { WidgetTopMerchantVisitsComponent } from 'app/modules/dashboard/widget-top-merchant-visits/widget-top-merchant-visits.component';

@NgModule({
  declarations: [
    DashboardComponent,
    WidgetGeneralComponent,
    WidgetNewUsersComponent,
    WidgetTopMerchantVisitsComponent,
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule,
    ChartsModule
  ]
})
export class DashboardModule { }
