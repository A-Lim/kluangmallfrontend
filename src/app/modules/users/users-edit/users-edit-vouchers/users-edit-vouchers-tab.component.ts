import { Component, OnInit, ViewChild, Input, TemplateRef } from '@angular/core';

import { User } from 'app/modules/users/models/user.model';
import { BaseAgGrid } from 'app/shared/components/baseaggrid.component';
import { VoucherService } from 'app/modules/vouchers/vouchers.service';

@Component({
  selector: 'users-edit-vouchers-tab',
  templateUrl: './users-edit-vouchers-tab.component.html',
  styleUrls: ['./users-edit-vouchers-tab.component.css']
})
export class UsersEditVouchersTabComponent extends BaseAgGrid implements OnInit {
  @ViewChild('statusCell', { static: true }) statusCell: TemplateRef<any>;

  @Input()
  user: User;

  constructor(private voucherSvc: VoucherService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    this.columnDefs = [
      this.getIndexColDef(),
      this.getColDef('Name', 'name', true, true),
      this.getColDef('Merchant', 'merchant', true, true),
      this.getDateColDef('Expiry Date', 'expiry_date'),
      this.getStatusColDef('Status', 'status', 100, false, this.statusCell),
    ];

    this.dataSourceCallBack = (params: any) => {
      params.user_id = `equals:${this.user.id}`;
      return this.voucherSvc.getMyVouchers(params);
    }

    this.setDataSource();
  }
}
