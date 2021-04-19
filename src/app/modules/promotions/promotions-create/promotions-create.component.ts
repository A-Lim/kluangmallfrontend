import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { switchMap } from 'rxjs/operators';

import { Base } from 'app/shared/components/base.component';
import { NgForm } from '@angular/forms';
import { PromotionVm } from 'app/modules/promotions/models/promotion.model.vm';
import { PromotionService } from 'app/modules/promotions/promotions.service';


@Component({
  selector: 'promotions-create',
  templateUrl: './promotions-create.component.html',
  styleUrls: ['./promotions-create.component.css']
})
export class PromotionsCreateComponent extends Base implements OnInit, OnDestroy {

  @ViewChild('form')
  form: NgForm;

  promotionVm: PromotionVm;

  constructor(private promotionSvc: PromotionService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitle('Create Promotion');
    this.promotionVm = new PromotionVm();
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
    
    this.promotionSvc.createPromotion(this.promotionVm)
      .pipe(switchMap(response => this.swalAlert('Success', response.message, 'success')))
      .subscribe(_ => {
        this.isLoading = false;
        this.router.navigate(['admin/promotions']);
      }, _ => { this.isLoading = false; });
  }
}