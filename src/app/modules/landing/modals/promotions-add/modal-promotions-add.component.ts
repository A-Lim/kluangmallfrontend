import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { BaseAgGrid } from 'app/shared/components/baseaggrid.component';
import { CustomOverlayRef } from 'app/shared/helpers/customoverlayref';
import { PromotionService } from 'app/modules/promotions/promotions.service';
import { Promotion } from 'app/modules/promotions/models/promotion.model';

@Component({
  selector: 'modal-promotions-add',
  templateUrl: './modal-promotions-add.component.html',
  styleUrls: ['./modal-promotions-add.component.css']
})
export class PromotionsAddModalComponent extends BaseAgGrid implements OnInit {
  @ViewChild('actionsCell', { static: true }) actionsCell: TemplateRef<any>;
  @ViewChild('statusCell', { static: true }) statusCell: TemplateRef<any>;

  promotions: Promotion[];

  constructor(public promotionSvc: PromotionService,
    private ref: CustomOverlayRef<Promotion[], Promotion[]>) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.promotions = this.ref.data;
    this.columnDefs = [
      this.getIndexColDef(),
      this.getColDef('Title', 'title', true, true),
      this.getColDef('Category', 'category', true, true),
      this.getDateColDef('From Date', 'fromDate'),
      this.getDateColDef('To Date', 'toDate'),
      this.getTemplateColDef('Status', 'status', 100, false, this.statusCell),
      this.getActionColDef('Action', '', 110, this.actionsCell),
    ];

    this.dataSourceCallBack = (params: any) => {
      params['status'] = 'equals:active';
      return this.promotionSvc.getPromotions(params);
    }
    
    this.setDataSource();
  }

  close() {
    this.ref.close();
  }

  add(promotion: Promotion) {
    if (!this.promotions.some(x => x.id === promotion.id)) {
      this.promotions.push(promotion);
    }
  }

  remove(index: number) {
    this.promotions.splice(index, 1);
  }

  addPromotions() {
    this.ref.save(this.promotions);
  }
  
}