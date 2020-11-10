import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { BannersRoutingModule } from 'app/modules/banners/banners.routing';
import { BannersListComponent } from 'app/modules/banners/banners-list/banners-list.component';

@NgModule({
  declarations: [
    BannersListComponent
  ],
  imports: [
    BannersRoutingModule,
    SharedModule,
  ],
})
export class BannersModule { }
