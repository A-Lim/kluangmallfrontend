import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Base } from 'app/shared/components/base.component';
import { VoucherService } from 'app/modules/vouchers/vouchers.service';
import { Voucher } from 'app/modules/vouchers/models/voucher.model';

@Component({
  selector: 'vouchers-edit',
  templateUrl: './vouchers-edit.component.html',
  styleUrls: ['./vouchers-edit.component.css']
})
export class VouchersEditComponent extends Base implements OnInit, OnDestroy {
  @ViewChild('form')
  form: NgForm;

  id: number;
  voucher: Voucher;
  activeTab: string;

  constructor(private voucherSvc: VoucherService,
    private activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitle('Create Voucher');

    this.activatedRoute.queryParams
      .subscribe(params => this.activeTab = params['tab'] ?? 'general');
    this.loadVoucher();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  loadVoucher() {
    this.isLoading = true;
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.isLoading = true;

    this.voucherSvc.getVoucher(this.id)
      .subscribe(response => {
        this.voucher = response.data;
        this.isLoading = false;
      }, _ => { this.isLoading = false; });
  }
}