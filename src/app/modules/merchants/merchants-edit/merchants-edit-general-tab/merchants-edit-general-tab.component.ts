import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Base } from 'app/shared/components/base.component';
import { MerchantService } from 'app/modules/merchants/merchants.service';
import { MerchantVm } from 'app/modules/merchants/models/merchant.model.vm';
import { MerchantCategory } from 'app/modules/merchants/models/merchantcategory.model';

@Component({
  selector: 'merchants-edit-general-tab',
  templateUrl: './merchants-edit-general-tab.component.html',
  styleUrls: ['./merchants-edit-general-tab.component.css']
})
export class MerchantsEditGeneralTabComponent extends Base implements OnInit, OnDestroy {
  @Input()
  merchantVm: MerchantVm;

  @Input()
  isLoading: boolean;
  
  @ViewChild('form')
  form: NgForm;

  Editor = ClassicEditor;  
  merchantCategories$: Observable<MerchantCategory[]>;
  merchantCategoriesInput$ = new Subject<string>();
  merchantCategoriesReqLoading: boolean;

  constructor(private merchantSvc: MerchantService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.loadMerchantCategory();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  loadMerchantCategory() {
    this.merchantCategories$ = concat(
      this.getMerchantCategoriesFn$(null, [this.merchantVm.category]), 
      this.merchantCategoriesInput$.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(_ => this.merchantCategoriesReqLoading = true),
        switchMap(searchStr => this.getMerchantCategoriesFn$(searchStr))
      )
    );
  }

  onSubmit() {
    this.submitted = true;
  
    // validate form
    if (!this.form.valid)
      return;

    this.isLoading = true;

    if (this.merchantVm.status === 'inactive') {
      this.swalConfirm('Confirm', 'Are you sure you want to set this merchant\'s status as inactive? All merchant users will be set to inactive.', 'warning', 'Edit')
        .pipe(
          filter(isConfirmed => isConfirmed),
          switchMap(_ => this.merchantSvc.updateMerchant(this.merchantVm.id, this.merchantVm)),
          switchMap(response => this.swalAlert('Success', response.message, 'success'))
        )
        .subscribe(_ => {
          this.isLoading = false;
          this.router.navigate(['admin/merchants']);
        }, _ => { this.isLoading = false; });
    } else {
      this.merchantSvc.updateMerchant(this.merchantVm.id, this.merchantVm)
        .pipe(switchMap(response => this.swalAlert('Success', response.message, 'success')))
        .subscribe(_ => {
          this.isLoading = false;
          this.router.navigate(['admin/merchants']);
        }, _ => { this.isLoading = false; });
    }
  }

  trackByFn(merchantCategory: MerchantCategory) {
    return merchantCategory.id;
  }

  private getMerchantCategoriesFn$(searchStr?: string, names?: string[]) {
    let params: any = { limit: 50, page: 1 };

    if (searchStr != null && searchStr != '')
     params.name = `contains:${searchStr}`;

    if (names && names.length > 0) {
      names.forEach(function (name, index) {
        params['name[' + index + ']'] = name;
      });
      // if names count > 50, override limit 
      params.limit = names.length > 50 ? names.length : 50;
    }

    return this.merchantSvc.getMerchantCategories(params).pipe(
      tap(_ => this.merchantCategoriesReqLoading = false),
      map(response => response.data.data),
      catchError(() => of([])), // empty list on error
    )
  }
}