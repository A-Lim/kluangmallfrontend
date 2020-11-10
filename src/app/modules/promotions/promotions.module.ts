import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { PromotionsRoutingModule } from 'app/modules/promotions/promotions.routing';
import { PromotionsCreateComponent } from 'app/modules/promotions/promotions-create/promotions-create.component';
import { PromotionsListComponent } from 'app/modules/promotions/promotions-list/promotions-list.component';
import { PromotionsEditComponent } from 'app/modules/promotions/promotions-edit/promotions-edit.component';

@NgModule({
  declarations: [
    PromotionsListComponent,
    PromotionsCreateComponent,
    PromotionsEditComponent,
  ],
  imports: [
    PromotionsRoutingModule,
    SharedModule,
  ],
})
export class PromotionsModule { }
