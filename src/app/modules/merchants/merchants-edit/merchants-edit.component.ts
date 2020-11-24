import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Base } from 'app/shared/components/base.component';
import { MerchantService } from 'app/modules/merchants/merchants.service';
import { MerchantVm } from 'app/modules/merchants/models/merchant.model.vm';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'merchants-edit',
  templateUrl: './merchants-edit.component.html',
  styleUrls: ['./merchants-edit.component.css']
})
export class MerchantsEditComponent extends Base implements OnInit, OnDestroy {
  
  id: number;
  merchantVm: MerchantVm;
  userTabHasBeenActive: boolean = false;

  constructor(private merchantSvc: MerchantService,
    private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitle('Edit Merchant');
    this.loadMerchant();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  loadMerchant() {
    this.isLoading = true;
    this.id = +this.route.snapshot.paramMap.get('id');

    this.merchantSvc.getMerchant(this.id)
      .subscribe(response => {
        this.merchantVm = <MerchantVm> {
          id: response.data.id,
          name: response.data.name,
          status: response.data.status,
          category: response.data.category,
          location: response.data.location,
          description: response.data.description,
          uploadLogo: [],
          logo: response.data.logo != null ? [response.data.logo] : [],
          website: response.data.website,
          email: response.data.email,
          phone: response.data.phone,
          business_reg_no: response.data.business_reg_no,
          terms_and_conditions: response.data.terms_and_conditions,
          privacy_policy: response.data.privacy_policy
        };

        this.isLoading = false;
      }, _ => { this.isLoading = false; });
  }
}