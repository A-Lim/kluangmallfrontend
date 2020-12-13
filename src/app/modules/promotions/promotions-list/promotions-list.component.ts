import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';

import { PromotionService } from 'app/modules/promotions/promotions.service';
import { BaseAgGrid } from 'app/shared/components/baseaggrid.component';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'promotions-list',
  templateUrl: './promotions-list.component.html',
  styleUrls: ['./promotions-list.component.css']
})
export class PromotionsListComponent extends BaseAgGrid implements OnInit {
  @ViewChild('actionsCell', { static: true }) actionsCell: TemplateRef<any>;
  @ViewChild('statusCell', { static: true }) statusCell: TemplateRef<any>;

  constructor(public promotionSvc: PromotionService) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitle('Promotions');
    this.columnDefs = [
      this.getIndexColDef(),
      this.getColDef('Title', 'title', true, true),
      this.getColDef('Category', 'category', true, true),
      this.getDateColDef('From Date', 'fromDate'),
      this.getDateColDef('To Date', 'toDate'),
      this.getStatusColDef('Status', 'status', 100, false, this.statusCell),
      this.getActionColDef('Action', '', 110, this.actionsCell),
    ];

    this.dataSourceCallBack = (params: any) => {
      return this.promotionSvc.getPromotions(params);
    }

    this.setDataSource();
  }

  delete(id: number) {
    this.swalConfirm('Confirm', 'Are you sure you want to delete this promotion?', 'warning', 'Delete')
      .pipe(
        filter(isConfirmed => isConfirmed),
        switchMap(_ => this.promotionSvc.deletePromotion(id)),
        switchMap(response => this.swalAlert('Success', response.message, 'success'))
      ).subscribe(_ => this.refreshTable());
  }
}
