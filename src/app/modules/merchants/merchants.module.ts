import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { MerchantsRoutingModule } from 'app/modules/merchants/merchants.routing';
import { MerchantsCreateComponent } from 'app/modules/merchants/merchants-create/merchants-create.component';
import { MerchantsEditComponent } from 'app/modules/merchants/merchants-edit/merchants-edit.component';
import { MerchantsEditGeneralTabComponent } from 'app/modules/merchants/merchants-edit/merchants-edit-general-tab/merchants-edit-general-tab.component';
import { MerchantsEditUsersTabComponent } from 'app/modules/merchants/merchants-edit/merchants-edit-users-tab/merchants-edit-users-tab.component';
import { MerchantsEditAccountTabComponent } from 'app/modules/merchants/merchants-edit/merchants-edit-credit-tab/merchants-edit-account-tab.component';
import { MerchantsListComponent } from 'app/modules/merchants/merchants-list/merchants-list.component';

import { MerchantUsersAddModalComponent } from 'app/modules/merchants/modals/merchant-users-add/modal-merchant-users-add.component';
import { MerchantManageCategoriesModalComponent } from 'app/modules/merchants/modals/manage-categories/modal-merchant-manage-categories.component';
import { MerchantTransactionDetailsModalComponent } from 'app/modules/merchants/modals/transaction-details/modal-merchant-transaction-details.component';
import { MerchantCreditTopUpModalComponent } from 'app/modules/merchants/modals/topup-credit/modal-merchant-credit-topup.component';
import { MerchantCreditRefundModalComponent } from 'app/modules/merchants/modals/refund-credit/modal-merchant-credit-refund.component';

@NgModule({
  declarations: [
    MerchantsListComponent,
    MerchantsCreateComponent,
    MerchantsEditComponent,
    MerchantsEditGeneralTabComponent,
    MerchantsEditUsersTabComponent,
    MerchantsEditAccountTabComponent,

    MerchantUsersAddModalComponent,
    MerchantManageCategoriesModalComponent,
    MerchantTransactionDetailsModalComponent,
    MerchantCreditTopUpModalComponent,
    MerchantCreditRefundModalComponent,
  ],
  imports: [
    MerchantsRoutingModule,
    SharedModule,
  ],
})
export class MerchantsModule { }
