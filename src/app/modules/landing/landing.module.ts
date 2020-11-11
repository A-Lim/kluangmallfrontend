import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { LandingRoutingModule } from 'app/modules/landing/landing.routing';
import { LandingManagementComponent } from 'app/modules/landing/landing-management/landing-management.component';

@NgModule({
  declarations: [
    LandingManagementComponent
  ],
  imports: [
    LandingRoutingModule,
    SharedModule,
    DragDropModule,
  ],
})
export class LandingModule { }
