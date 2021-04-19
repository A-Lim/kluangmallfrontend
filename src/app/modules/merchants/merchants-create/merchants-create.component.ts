import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';

import { Base } from 'app/shared/components/base.component';
import { MerchantService } from 'app/modules/merchants/merchants.service';
import { MerchantVm } from 'app/modules/merchants/models/merchant.model.vm';
import { MerchantCategory } from 'app/modules/merchants/models/merchantcategory.model';

@Component({
  selector: 'merchants-create',
  templateUrl: './merchants-create.component.html',
  styleUrls: ['./merchants-create.component.css']
})
export class MerchantsCreateComponent extends Base implements OnInit, OnDestroy {
  @ViewChild('form')
  form: NgForm;

  merchantVm: MerchantVm;
  merchantCategories$: Observable<MerchantCategory[]>;
  merchantCategoriesInput$ = new Subject<string>();
  merchantCategoriesReqLoading: boolean;

  constructor(private merchantSvc: MerchantService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitle('Create Merchant');
    this.merchantVm = new MerchantVm();
    this.loadMerchantCategory();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  onSubmit() {
    let newMerchantId = 0;
    this.submitted = true;
  
    // validate form
    if (!this.form.valid)
      return;

    this.isLoading = true;
    
    this.merchantSvc.createMerchant(this.merchantVm)
      .pipe(
        switchMap(response => {
          newMerchantId = response.data.id;
          return this.swalAlert('Success', response.message, 'success');
        })
      )
      .subscribe(_ => {
        this.isLoading = false;
        this.router.navigate(['admin/merchants', newMerchantId]);
      }, _ => { this.isLoading = false; });
  }

  loadMerchantCategory() {
    this.merchantCategories$ = concat(
      this.getMerchantCategoriesFn$(), 
      this.merchantCategoriesInput$.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(_ => this.merchantCategoriesReqLoading = true),
        switchMap(searchStr => this.getMerchantCategoriesFn$(searchStr))
      ) 
    );
  }

  trackByFn(merchantCategory: MerchantCategory) {
    return merchantCategory.id;
  }

  private getMerchantCategoriesFn$(searchStr?: string) {
    let params: any = { limit: 50, page: 1 };

    if (searchStr != null && searchStr != '')
     params.name = `contains:${searchStr}`;

    return this.merchantSvc.getMerchantCategories(params).pipe(
      tap(_ => this.merchantCategoriesReqLoading = false),
      map(response => response.data.data),
      catchError(() => of([])), // empty list on error
    )
  }
}