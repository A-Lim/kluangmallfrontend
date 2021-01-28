import { Component, OnInit, ViewChild, OnDestroy, Input, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { filter, map } from 'rxjs/operators';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';

import { BaseAgGrid } from 'app/shared/components/baseaggrid.component';
import { MerchantService } from 'app/modules/merchants/merchants.service';
import { ModalSize } from 'app/shared/models/modalsize.enum';
import { Merchant } from 'app/modules/merchants/models/merchant.model';
import { MerchantAccount } from 'app/modules/merchants/models/merchant-account.model';
import { MerchantTransaction } from 'app/modules/merchants/models/merchant-transaction.model';
import { MerchantTransactionDetailsModalComponent } from 'app/modules/merchants/modals/transaction-details/modal-merchant-transaction-details.component';
import { MerchantCreditTopUpModalComponent } from 'app/modules/merchants/modals/topup-credit/modal-merchant-credit-topup.component';
import { MerchantCreditRefundModalComponent } from 'app/modules/merchants/modals/refund-credit/modal-merchant-credit-refund.component';

@Component({
  selector: 'merchants-edit-account-tab',
  templateUrl: './merchants-edit-account-tab.component.html',
  styleUrls: ['./merchants-edit-account-tab.component.css']
})
export class MerchantsEditAccountTabComponent extends BaseAgGrid implements OnInit, OnDestroy {
  @ViewChild('actionsCell', { static: true }) actionsCell: TemplateRef<any>;
  @ViewChild('statusCell', { static: true }) statusCell: TemplateRef<any>;
  
  @Input()
  merchant: Merchant;

  @Input()
  isLoading: boolean;
  
  @ViewChild('form')
  form: NgForm;

  constructor(private merchantSvc: MerchantService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    // init empty merchant account
    if (this.merchant.account == null)
      this.merchant.account = <MerchantAccount> { credit: 0 };

    this.columnDefs = [
      this.getIndexColDef(),
      this.getColDef('Title', 'title', true, true),
      this.getColDef('Type', 'type', true, true),
      this.getNumberColDef('Credit', 'credit', true, true),
      <ColDef> {
        headerName: 'Date',
        field: 'created_at',
        sortable: false,
        filter: false,
        suppressMenu: true,
        floatingFilterComponentParams: { suppressFilterButton: true },
      },
      this.getActionColDef('Action', '', 90, this.actionsCell),
    ];

    this.dataSourceCallBack = (params: any) => {
      return this.merchantSvc.getMerchantAccountTransactions(this.merchant.id, params);
    }

    this.setDataSource();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  onSubmit() {
    this.submitted = true;
  
    // validate form
    if (!this.form.valid)
      return;

    this.isLoading = true;
  }

  topUp() {
    this.modalSvc.open(MerchantCreditTopUpModalComponent, this.merchant, ModalSize.Medium)
      .afterClosed$
      .pipe(
        filter(x => x.type == 'save'),
        map(x => x.data)
      )
      .subscribe(balance => {
        this.merchant.account.credit = balance;
        this.refreshTable();
      });
  }

  refund(transaction: MerchantTransaction) {
    this.modalSvc.open(MerchantCreditRefundModalComponent, transaction, ModalSize.Medium)
      .afterClosed$
      .pipe(
        filter(x => x.type == 'save'),
        map(x => x.data)
      )
      .subscribe(balance => {
        this.merchant.account.credit = balance;
        this.refreshTable();
      });
  }

  showTransactionDetails(transaction: MerchantTransaction) {
    this.modalSvc.open(MerchantTransactionDetailsModalComponent, transaction, ModalSize.Medium);
  }
}