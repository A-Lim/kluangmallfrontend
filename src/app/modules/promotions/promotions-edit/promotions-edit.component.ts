import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Base } from 'app/shared/components/base.component';
import { NgForm } from '@angular/forms';
import { PromotionVm } from 'app/modules/promotions/models/promotion.model.vm';
import { PromotionService } from 'app/modules/promotions/promotions.service';

@Component({
  selector: 'promotions-edit',
  templateUrl: './promotions-edit.component.html',
  styleUrls: ['./promotions-edit.component.css']
})
export class PromotionsEditComponent extends Base implements OnInit, OnDestroy {

  @ViewChild('form')
  form: NgForm;

  Editor = ClassicEditor;
  promotionVm: PromotionVm;
  id: number;

  constructor(private promotionSvc: PromotionService,
    private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitle('Edit Promotion');
    this.promotionVm = new PromotionVm();

    this.loadPromotion();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  loadPromotion() {
    this.isLoading = true;
    this.id = +this.route.snapshot.paramMap.get('id');

    this.promotionSvc.getPromotion(this.id)
      .subscribe(response => {
        this.promotionVm = <PromotionVm> {
          title: response.data.title,
          category: response.data.category,
          status: response.data.status,
          fromDate: response.data.fromDate,
          toDate: response.data.toDate,
          caption: response.data.caption,
          content: response.data.content,
          thumbnail: response.data.thumbnail != null ? [response.data.thumbnail] : [],
          uploadThumbnail: null,
          images: response.data.images,
          uploadImages: null,
          externalLink: response.data.externalLink
        };

        this.isLoading = false;
      }, _ => { this.isLoading = false; });
  }

  onSubmit() {
    this.submitted = true;
  
    // validate form
    if (!this.form.valid)
      return;

    this.isLoading = true;
    this.promotionSvc.updatePromotion(this.id, this.promotionVm)
      .pipe(switchMap(response => this.swalAlert('Success', response.message, 'success')))
      .subscribe(_ => {
        this.isLoading = false;
        this.router.navigate(['admin/promotions']);
      }, _ => { this.isLoading = false; });
  }
}