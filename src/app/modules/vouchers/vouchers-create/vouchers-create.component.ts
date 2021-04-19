import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';


import { Base } from 'app/shared/components/base.component';
import { VoucherService } from 'app/modules/vouchers/vouchers.service';
import { VoucherLimitVm, VoucherVm } from 'app/modules/vouchers/models/voucher.model.vm';
import { MerchantService } from 'app/modules/merchants/merchants.service';
import { Shop } from 'app/modules/merchants/models/shop.model';

@Component({
  selector: 'vouchers-create',
  templateUrl: './vouchers-create.component.html',
  styleUrls: ['./vouchers-create.component.css']
})
export class VouchersCreateComponent extends Base implements OnInit, OnDestroy {
  @ViewChild('form')
  form: NgForm;

  voucherVm: VoucherVm;

  merchants$: Observable<Shop[]>;
  merchantsInput$ = new Subject<string>();
  merchantsReqLoading: boolean;

  constructor(private voucherSvc: VoucherService,
    private merchantSvc: MerchantService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitle('Create Voucher');
    this.voucherVm = new VoucherVm();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  addLimit() {
    if (this.voucherVm.limits == null)
      this.voucherVm.limits = [];

    this.voucherVm.limits.push(new VoucherLimitVm());
  }

  removeLimit(index: number) {
    this.voucherVm.limits.splice(index, 1);
  }

  hasLimitOnChange(hasLimit: boolean) {
    if (!hasLimit)
      this.voucherVm.limits = [];
  }

  trackByFn(index: number, limit: VoucherLimitVm) {
    return index;
  }

  onSubmit() {
    this.submitted = true;
    
    // validate form
    if (!this.form.valid)
      return;

    this.isLoading = true;
    
    let newVoucherId = 0;
    this.voucherSvc.createVoucher(this.voucherVm)
      .pipe(
        tap(response => newVoucherId = response.data.id),
        switchMap(response => this.swalAlert('Success', response.message, 'success'))
      )
      .subscribe(_ => { 
        this.isLoading = false;
        this.router.navigate(['admin/vouchers', newVoucherId], { queryParams: { tab: 'merchants' } });
      }, errorResponse => {
        this.swalAlert('Error', errorResponse.error.message, 'error');
        this.isLoading = false;
      });
  }
}