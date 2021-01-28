import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { VouchersRoutingModule } from 'app/modules/vouchers/vouchers.routing';
import { VouchersListComponent } from 'app/modules/vouchers/vouchers-list/vouchers-list.component';
import { VouchersCreateComponent } from 'app/modules/vouchers/vouchers-create/vouchers-create.component';
import { VouchersEditComponent } from 'app/modules/vouchers/vouchers-edit/vouchers-edit.component';
import { VouchersTabComponent } from 'app/modules/vouchers/vouchers-list/vouchers-tab/vouchers-tab.component';
import { TransactionsTabComponent } from 'app/modules/vouchers/vouchers-list/transactions-tab/transactions-tab.component';
import { IsLimitUniqueValidator } from 'app/modules/vouchers/validators/isLimitUnique.validator';

@NgModule({
  declarations: [
    VouchersListComponent,
    VouchersTabComponent,
    TransactionsTabComponent,
    VouchersCreateComponent,
    VouchersEditComponent,
    
    IsLimitUniqueValidator,
  ],
  imports: [
    VouchersRoutingModule,
    SharedModule,
  ],
})
export class VouchersModule { }
