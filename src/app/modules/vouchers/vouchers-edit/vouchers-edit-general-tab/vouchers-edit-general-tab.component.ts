import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Base } from 'app/shared/components/base.component';
import { VoucherService } from 'app/modules/vouchers/vouchers.service';
import { Voucher, VoucherLimit } from 'app/modules/vouchers/models/voucher.model';
import { VoucherLimitVm, VoucherVm } from 'app/modules/vouchers/models/voucher.model.vm';

@Component({
  selector: 'vouchers-edit-general-tab',
  templateUrl: './vouchers-edit-general-tab.component.html',
  styleUrls: ['./vouchers-edit-general-tab.component.css']
})
export class VouchersEditGeneralTabComponent extends Base implements OnInit {

  @Input()
  voucher: Voucher;

  @ViewChild('form')
  form: NgForm;

  voucherVm: VoucherVm;
  qrData: string;
  Editor = ClassicEditor;
  isDownloading: boolean = false;

  constructor(private voucherSvc: VoucherService) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.initVoucherVm();
    this.qrData = JSON.stringify({ voucher_id: this.voucher.id });
  }
  
  initVoucherVm() {
    const limits = this.voucher.limits ?? [];

    this.voucherVm = <VoucherVm> {
      name: this.voucher.name,
      status: this.voucher.status,
      description: this.voucher.description,
      image: this.voucher.image != null ? [this.voucher.image] : [],
      uploadImage: [],
      qr: this.voucher.qr != null ? [this.voucher.qr] : [],
      uploadQr: [],
      points: this.voucher.points,
      fromDate: this.voucher.fromDate,
      toDate: this.voucher.toDate,
      terms_and_conditions: this.voucher.terms_and_conditions,
      has_redemption_limit: this.voucher.has_redemption_limit,
      limits: limits.map(x => <VoucherLimit> { type: x.type, value: x.value })
    };
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
    this.voucherSvc.updateVoucher(this.voucher.id, this.voucherVm)
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

  downloadQr() {
    this.isDownloading = true;
    const fileName = this.voucherVm.name;
    const base64Img = document.querySelector('#qrCode > div > img')['src'];

    fetch(base64Img)
      .then(res => res.blob())
      .then((blob) => {
         // IE
         if (window.navigator && window.navigator.msSaveOrOpenBlob){
            window.navigator.msSaveOrOpenBlob(blob, fileName);
         } else { // Chrome
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            link.click();
            link.remove();
         }
         this.isDownloading = false;
      });
  }
}
