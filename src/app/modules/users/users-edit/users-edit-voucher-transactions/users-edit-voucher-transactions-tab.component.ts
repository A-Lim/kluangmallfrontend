import { Component, OnInit, ViewChild, Input, TemplateRef } from '@angular/core';

import { User } from 'app/modules/users/models/user.model';
import { BaseAgGrid } from 'app/shared/components/baseaggrid.component';
import { VoucherService } from 'app/modules/vouchers/vouchers.service';

@Component({
  selector: 'users-edit-voucher-transactions-tab',
  templateUrl: './users-edit-voucher-transactions-tab.component.html',
  styleUrls: ['./users-edit-voucher-transactions-tab.component.css']
})
export class UsersEditVoucherTransactionsTabComponent extends BaseAgGrid implements OnInit {
  @ViewChild('typeCell', { static: true }) typeCell: TemplateRef<any>;

  @Input()
  user: User;

  constructor(private voucherSvc: VoucherService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    this.columnDefs = [
      this.getIndexColDef(),
      this.getColDef('Voucher', 'voucher', true, true),
      this.getColDef('Merchant', 'merchant', true, true),
      this.getStatusColDef('Type', 'type', 100, false, this.typeCell),
      this.getDateColDef('Date', 'created_at')
    ];

    this.dataSourceCallBack = (params: any) => {
      params.user_id = `equals:${this.user.id}`;
      return this.voucherSvc.getVoucherTransactions(params);
    }

    this.setDataSource();
  }
}
