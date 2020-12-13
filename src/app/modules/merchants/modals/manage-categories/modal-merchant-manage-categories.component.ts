import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { BaseAgGrid } from 'app/shared/components/baseaggrid.component';
import { CustomOverlayRef } from 'app/shared/helpers/customoverlayref';
import { MerchantService } from 'app/modules/merchants/merchants.service';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'modal-merchant-manage-categories',
  templateUrl: './modal-merchant-manage-categories.component.html',
  styleUrls: ['./modal-merchant-manage-categories.component.css']
})
export class MerchantManageCategoriesModalComponent extends BaseAgGrid implements OnInit {
  @ViewChild('actionsCell', { static: true }) actionsCell: TemplateRef<any>;

  constructor(public merchantSvc: MerchantService,
    private ref: CustomOverlayRef) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.columnDefs = [
      this.getIndexColDef(),
      this.getColDef('Name', 'name', true, true),
      this.getActionColDef('Action', '', 20, this.actionsCell),
    ];

    this.dataSourceCallBack = (params: any) => {
      return this.merchantSvc.getMerchantCategories(params);
    }

    this.setDataSource();
  }

  close() {
    this.ref.close();
  }

  delete(id: number) {
    this.swalConfirm('Confirm', 'Are you sure you want to delete this category?', 'warning', 'Delete')
      .pipe(
        filter(isConfirmed => isConfirmed),
        switchMap(_ => this.merchantSvc.deleteMerchantCategory(id)),
        switchMap(response => this.swalAlert('Success', response.message, 'success'))
      ).subscribe(_ => this.refreshTable());
  }
}