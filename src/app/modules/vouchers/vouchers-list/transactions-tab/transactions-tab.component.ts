import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';

import { BaseAgGrid } from 'app/shared/components/baseaggrid.component';
import { VoucherService } from 'app/modules/vouchers/vouchers.service';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'transactions-tab',
  templateUrl: './transactions-tab.component.html',
  styleUrls: ['./transactions-tab.component.css']
})
export class TransactionsTabComponent extends BaseAgGrid implements OnInit, OnDestroy {
  @ViewChild('actionsCell', { static: true }) actionsCell: TemplateRef<any>;
  @ViewChild('typeCell', { static: true }) typeCell: TemplateRef<any>;

  constructor(private voucherSvc: VoucherService) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    this.columnDefs = [
      this.getIndexColDef(),
      this.getColDef('User', 'user', true, true),
      this.getColDef('Merchant', 'merchant', true, true),
      this.getColDef('Voucher', 'voucher', true, true),
      this.getDateColDef('Date', 'created_at'),
      this.getStatusColDef('Type', 'type', 100, false, this.typeCell)
    ];

    this.dataSourceCallBack = (params: any) => {
      return this.voucherSvc.getVoucherTransactions(params);
    }

    this.setDataSource();
  }
}