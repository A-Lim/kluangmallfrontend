import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';

import { BaseAgGrid } from 'app/shared/components/baseaggrid.component';
import { VoucherService } from 'app/modules/vouchers/vouchers.service';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'vouchers-tab',
  templateUrl: './vouchers-tab.component.html',
  styleUrls: ['./vouchers-tab.component.css']
})
export class VouchersTabComponent extends BaseAgGrid implements OnInit, OnDestroy {
  @ViewChild('actionsCell', { static: true }) actionsCell: TemplateRef<any>;
  @ViewChild('statusCell', { static: true }) statusCell: TemplateRef<any>;

  constructor(private voucherSvc: VoucherService) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    this.columnDefs = [
      this.getIndexColDef(),
      this.getColDef('Name', 'name', true, true),
      this.getColDef('Merchant', 'merchant_name', true, true),
      this.getDateColDef('From Date', 'fromDate'),
      this.getDateColDef('To Date', 'toDate'),
      this.getStatusColDef('Status', 'status', 100, false, this.statusCell),
      this.getActionColDef('Action', '', 120, this.actionsCell),
    ];

    this.dataSourceCallBack = (params: any) => {
      return this.voucherSvc.getVouchers(params);
    }

    this.setDataSource();
  }

  delete(id: number) {
    this.swalConfirm('Confirm', 'Are you sure you want to delete this voucher?', 'warning', 'Delete')
      .pipe(
        filter(isConfirmed => isConfirmed),
        switchMap(_ => this.voucherSvc.deleteVoucher(id)),
        switchMap(response => this.swalAlert('Success', response.message, 'success'))
      ).subscribe(_ => this.refreshTable());
  }
}