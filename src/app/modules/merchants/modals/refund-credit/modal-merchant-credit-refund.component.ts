import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { filter, switchMap, tap } from 'rxjs/operators';

import { Base } from 'app/shared/components/base.component';
import { CustomOverlayRef } from 'app/shared/helpers/customoverlayref';
import { MerchantService } from 'app/modules/merchants/merchants.service';
import { Merchant } from 'app/modules/merchants/models/merchant.model';
import { MerchantTransaction } from 'app/modules/merchants/models/merchant-transaction.model';
import { MerchantTransactionVm } from 'app/modules/merchants/models/merchant-transaction.model.vm';

@Component({
  selector: 'modal-merchant-credit-refund',
  templateUrl: './modal-merchant-credit-refund.component.html',
  styleUrls: ['./modal-merchant-credit-refund.component.css']
})
export class MerchantCreditRefundModalComponent extends Base implements OnInit {
  @ViewChild('form')
  form: NgForm;
  
  transaction: MerchantTransaction;
  transactionVm: MerchantTransactionVm;
  balance: number;

  constructor(public merchantSvc: MerchantService,
    private ref: CustomOverlayRef<number, MerchantTransaction>) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.transaction = this.ref.data;
    this.transactionVm = new MerchantTransactionVm();
  }

  close() {
    this.ref.close();
  }

  onSubmit() {
    this.submitted = true;

    if (!this.form.valid)
      return;

    this.isLoading = true;
    this.swalConfirm('Confirm', 'Are you sure you want to refund this transaction?', 'warning', 'Refund')
      .pipe(
        tap(isConfirmed => { if (!isConfirmed) this.isLoading = false; }),
        filter(isConfirmed => isConfirmed),
        switchMap(_ => this.merchantSvc.refund(this.transaction.id, this.transactionVm)),
        tap(response => this.balance = response.data.credit_balance),
        switchMap(response => this.swalAlert('Success', response.message, 'success'))
      ).subscribe(_ => {
        this.isLoading = false;
        this.ref.save(this.balance);
      }, error => {
        this.swalAlert('Error', error.error.message, 'error');
        this.isLoading = false;
      });
  }
}