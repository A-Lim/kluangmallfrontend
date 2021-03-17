import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Base } from 'app/shared/components/base.component';
import { VoucherService } from 'app/modules/vouchers/vouchers.service';
import { VoucherLimitVm, VoucherVm } from 'app/modules/vouchers/models/voucher.model.vm';
import { Merchant } from 'app/modules/merchants/models/merchant.model';
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
  Editor = ClassicEditor;

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
    this.loadMerchants();
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
    this.voucherSvc.createVoucher(this.voucherVm)
      .pipe(
        switchMap(response => this.swalAlert('Success', response.message, 'success'))
      )
      .subscribe(_ => { 
        this.isLoading = false;
        this.router.navigate(['admin/vouchers']);
      }, errorResponse => {
        this.swalAlert('Error', errorResponse.error.message, 'error');
        this.isLoading = false;
      });
  }

  loadMerchants() {
    this.merchants$ = concat(
      this.getMerchantsFn$(), // default items
      this.merchantsInput$.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(_ => this.merchantsReqLoading = true),
        switchMap(searchStr => this.getMerchantsFn$(searchStr))
      )
    );
  }

  getMerchantsFn$(searchStr: string = '') {
    let params: any = { limit: 10, page: 1 };

    if (searchStr != null && searchStr != '')
      params.name = `contains:${searchStr}`;

    return this.merchantSvc.getShops(params).pipe(
      tap(_ => this.merchantsReqLoading = false),
      map(response => response.data),
      catchError(() => of([])), // empty list on error
    )
  }

  trackByMerchantFn(merchant: Merchant) {
    return merchant.id;
  }
}