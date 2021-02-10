import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { UsersRoutingModule } from 'app/modules/users/users.routing';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersCreateComponent } from './users-create/users-create.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { UsersEditGeneralTabComponent } from './users-edit/users-edit-general-tab/users-edit-general-tab.component';
import { UsersEditPointsTabComponent } from './users-edit/users-edit-points-tab/users-edit-points-tab.component';
import { UsersEditVouchersTabComponent } from './users-edit/users-edit-vouchers/users-edit-vouchers-tab.component';
import { UsersEditReceiptsTabComponent } from './users-edit/users-edit-receipts/users-edit-receipts-tab.component';
import { UsersEditVoucherTransactionsTabComponent } from './users-edit/users-edit-voucher-transactions/users-edit-voucher-transactions-tab.component';


@NgModule({
  declarations: [
    UsersListComponent,
    UsersCreateComponent,
    UsersEditComponent,
    UsersEditGeneralTabComponent,
    UsersEditPointsTabComponent,
    UsersEditVouchersTabComponent,
    UsersEditReceiptsTabComponent,
    UsersEditVoucherTransactionsTabComponent
  ],
  imports: [
    UsersRoutingModule,
    SharedModule,
  ],
})
export class UsersModule { }
