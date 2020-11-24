import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { LandingRoutingModule } from 'app/modules/landing/landing.routing';
import { LandingManagementComponent } from 'app/modules/landing/landing-management/landing-management.component';
import { BannersAddModalComponent } from './modals/banners-add/modal-banner-add.component';
import { EventsAddModalComponent } from 'app/modules/landing/modals/events-add/modal-events-add.component';
import { PromotionsAddModalComponent } from './modals/promotions-add/modal-promotions-add.component';

@NgModule({
  declarations: [
    LandingManagementComponent,
    BannersAddModalComponent,
    EventsAddModalComponent,
    PromotionsAddModalComponent,
  ],
  imports: [
    LandingRoutingModule,
    SharedModule,
    DragDropModule,
  ],
})
export class LandingModule { }
