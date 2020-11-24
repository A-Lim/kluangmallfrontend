import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { MerchantsRoutingModule } from 'app/modules/merchants/merchants.routing';
import { MerchantsCreateComponent } from 'app/modules/merchants/merchants-create/merchants-create.component';
import { MerchantsEditComponent } from 'app/modules/merchants/merchants-edit/merchants-edit.component';
import { MerchantsEditGeneralTabComponent } from 'app/modules/merchants/merchants-edit/merchants-edit-general-tab/merchants-edit-general-tab.component';
import { MerchantsEditUsersTabComponent } from 'app/modules/merchants/merchants-edit/merchants-edit-users-tab/merchants-edit-users-tab.component';
import { MerchantsListComponent } from 'app/modules/merchants/merchants-list/merchants-list.component';

import { MerchantUsersAddModalComponent } from 'app/modules/merchants/modals/merchant-users-add/modal-merchant-users-add.component';
import { MerchantManageCategoriesModalComponent } from 'app/modules/merchants/modals/manage-categories/modal-merchant-manage-categories.component';

@NgModule({
  declarations: [
    MerchantsListComponent,
    MerchantsCreateComponent,
    MerchantsEditComponent,
    MerchantsEditGeneralTabComponent,
    MerchantsEditUsersTabComponent,

    MerchantUsersAddModalComponent,
    MerchantManageCategoriesModalComponent,
  ],
  imports: [
    MerchantsRoutingModule,
    SharedModule,
  ],
})
export class MerchantsModule { }
