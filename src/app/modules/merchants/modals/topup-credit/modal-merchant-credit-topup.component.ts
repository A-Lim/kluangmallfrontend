import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';

import { Base } from 'app/shared/components/base.component';
import { CustomOverlayRef } from 'app/shared/helpers/customoverlayref';
import { MerchantService } from 'app/modules/merchants/merchants.service';
import { Merchant } from 'app/modules/merchants/models/merchant.model';
import { MerchantTransactionVm } from 'app/modules/merchants/models/merchant-transaction.model.vm';

@Component({
  selector: 'modal-merchant-credit-topup',
  templateUrl: './modal-merchant-credit-topup.component.html',
  styleUrls: ['./modal-merchant-credit-topup.component.css']
})
export class MerchantCreditTopUpModalComponent extends Base implements OnInit {
  @ViewChild('form')
  form: NgForm;
  
  merchant: Merchant;
  transactionVm: MerchantTransactionVm;
  credit: number = 0;
  balance: number = 0;

  constructor(public merchantSvc: MerchantService,
    private ref: CustomOverlayRef<number, Merchant>) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.merchant = this.ref.data;
    this.transactionVm = new MerchantTransactionVm();
  }

  onAmountChange(amount: number) {
    this.credit = Math.round(amount);
  }

  close() {
    this.ref.close();
  }

  onSubmit() {
    this.submitted = true;

    if (!this.form.valid)
      return;

    this.isLoading = true;
    this.merchantSvc.topUp(this.merchant.id, this.transactionVm)
      .pipe(
        tap(response => this.balance = response.data.credit_balance),
        switchMap(response => this.swalAlert('Success', response.message, 'success'))
      )
      .subscribe(_ => {
        this.isLoading = false;
        this.ref.save(this.balance);
      }, errorResponse => {
        this.swalAlert('Error', errorResponse.error.message, 'error');
        this.isLoading = false;
      });
  }
}