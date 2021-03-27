import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';

import { Base } from 'app/shared/components/base.component';
import { VoucherService } from 'app/modules/vouchers/vouchers.service';
import { MerchantService } from 'app/modules/merchants/merchants.service';
import { CheckBox } from 'app/shared/models/checkbox.model';
import { Voucher } from 'app/modules/vouchers/models/voucher.model';

@Component({
  selector: 'vouchers-edit-merchants-tab',
  templateUrl: './vouchers-edit-merchants-tab.component.html',
  styleUrls: ['./vouchers-edit-merchants-tab.component.css']
})
export class VouchersEditMerchantsTabComponent extends Base implements OnInit {

  @Input()
  voucher: Voucher;

  searchSub = new Subject<string>();
  checkboxes: CheckBox[];
  isAllSelected: boolean = false;

  constructor(private merchantSvc: MerchantService,
    private voucherSvc: VoucherService) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.loadMerchants();

    this.searchSub.asObservable()
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(100),
        distinctUntilChanged()
      ).subscribe(searchStr => this.loadMerchants(searchStr));
  }

  searchMerchant(searchStr: string) {
    this.searchSub.next(searchStr);
  }

  loadMerchants(searchStr: string = null) {
    const merchant_ids = this.voucher.merchants ? this.voucher.merchants.map(x => x.id) : [];
    const params: any = {};

    if (searchStr)
      params.name = 'contains:' + searchStr;

    this.checkboxes = null;
    this.merchantSvc.getShops(params)
      .subscribe(response => {
        this.checkboxes = response.data.map(x => <CheckBox> {
          name: x.name,
          value: x.id,
          isChecked: merchant_ids.includes(x.id)
        });

        this.isLoading = false;
      });
    
  }

  isAllSelectedChange(isChecked: boolean) {
    this.checkboxes.forEach(x => x.isChecked = isChecked);
  }

  onSubmit() {
    this.isLoading = true;
    const merchant_ids = this.checkboxes.reduce((arr, checkbox) => {
      if (checkbox.isChecked)
        arr.push(checkbox.value);
      
      return arr;
    }, []);

    this.voucherSvc.updateMerchants(this.voucher.id, merchant_ids)
      .pipe(switchMap(response => this.swalAlert('Success', response.message, 'success')))
      .subscribe(_ => { 
        this.isLoading = false;
        this.router.navigate(['admin/vouchers']);
      }, errorResponse => {
        this.swalAlert('Error', errorResponse.error.message, 'error');
        this.isLoading = false;
      });
  }
}
