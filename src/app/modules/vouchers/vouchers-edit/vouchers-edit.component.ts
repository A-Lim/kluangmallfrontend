import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Base } from 'app/shared/components/base.component';
import { VoucherService } from 'app/modules/vouchers/vouchers.service';
import { Shop } from 'app/modules/merchants/models/shop.model';
import { VoucherLimit } from 'app/modules/vouchers/models/voucher.model';
import { Merchant } from 'app/modules/merchants/models/merchant.model';
import { VoucherLimitVm, VoucherVm } from 'app/modules/vouchers/models/voucher.model.vm';
import { MerchantService } from 'app/modules/merchants/merchants.service';

@Component({
  selector: 'vouchers-edit',
  templateUrl: './vouchers-edit.component.html',
  styleUrls: ['./vouchers-edit.component.css']
})
export class VouchersEditComponent extends Base implements OnInit, OnDestroy {
  @ViewChild('form')
  form: NgForm;

  id: number;
  voucherVm: VoucherVm;
  Editor = ClassicEditor;

  merchants$: Observable<Shop[]>;
  merchantsInput$ = new Subject<string>();
  merchantsReqLoading: boolean;

  constructor(private voucherSvc: VoucherService,
    private merchantSvc: MerchantService,
    private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitle('Create Voucher');
    this.voucherVm = new VoucherVm();

    this.loadMerchants();
    this.loadVoucher();
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
    this.voucherSvc.updateVoucher(this.id, this.voucherVm)
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

  loadVoucher() {
    this.isLoading = true;
    this.id = +this.route.snapshot.paramMap.get('id');
    this.isLoading = true;

    this.voucherSvc.getVoucher(this.id)
      .subscribe(response => {
        this.isLoading = false;
        const limits = response.data.limits ?? [];
        
        this.voucherVm = <VoucherVm> {
          name: response.data.name,
          merchant_id: response.data.merchant_id,
          status: response.data.status,
          description: response.data.description,
          image: response.data.image != null ? [response.data.image] : [],
          uploadImage: [],
          qr: response.data.qr != null ? [response.data.qr] : [],
          uploadQr: [],
          points: response.data.points,
          fromDate: response.data.fromDate,
          toDate: response.data.toDate,
          terms_and_conditions: response.data.terms_and_conditions,
          has_redemption_limit: response.data.has_redemption_limit,
          limits: limits.map(x => <VoucherLimit> { type: x.type, value: x.value })
        };

        this.isLoading = false;
      }, _ => { this.isLoading = false; });
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