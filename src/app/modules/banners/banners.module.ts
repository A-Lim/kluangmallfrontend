import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { BannersRoutingModule } from 'app/modules/banners/banners.routing';
import { BannersCreateComponent } from 'app/modules/banners/banners-create/banners-create.component';
import { BannersListComponent } from 'app/modules/banners/banners-list/banners-list.component';
import { BannersEditComponent } from 'app/modules/banners/banners-edit/banners-edit.component';
import { BannersTableComponent } from 'app/modules/banners/banners-list/banners-table/banners-table.component';


@NgModule({
  declarations: [
    BannersListComponent,
    BannersCreateComponent,
    BannersEditComponent,
    BannersTableComponent,
    
  ],
  imports: [
    BannersRoutingModule,
    SharedModule,
  ],
})
export class BannersModule { }
