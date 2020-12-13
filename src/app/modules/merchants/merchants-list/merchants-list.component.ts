import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';

import { MerchantService } from 'app/modules/merchants/merchants.service';
import { BaseAgGrid } from 'app/shared/components/baseaggrid.component';
import { MerchantManageCategoriesModalComponent } from 'app/modules/merchants/modals/manage-categories/modal-merchant-manage-categories.component';

@Component({
  selector: 'merchants-list',
  templateUrl: './merchants-list.component.html',
  styleUrls: ['./merchants-list.component.css']
})
export class MerchantsListComponent extends BaseAgGrid implements OnInit {
  @ViewChild('actionsCell', { static: true }) actionsCell: TemplateRef<any>;
  @ViewChild('statusCell', { static: true }) statusCell: TemplateRef<any>;

  constructor(public merchantSvc: MerchantService) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitle('Merchants');
    this.columnDefs = [
      this.getIndexColDef(),
      this.getColDef('Name', 'name', true, true),
      this.getColDef('Category', 'category', true, true),
      this.getColDef('Business Reg No.', 'business_reg_no', true, true),
      this.getNumberColDef('Credit', 'account.credit', false, false),
      this.getStatusColDef('Status', 'status', 100, false, this.statusCell),
      this.getActionColDef('Action', '', 110, this.actionsCell),
    ];

    this.dataSourceCallBack = (params: any) => {
      return this.merchantSvc.getMerchants(params);
    }

    this.setDataSource();
  }

  manageCategories() {
    this.modalSvc.open(MerchantManageCategoriesModalComponent, null);
  }

  delete(id: number) {
    // this.swalConfirm('Confirm', 'Are you sure you want to delete this merchant?', 'warning', 'Delete')
    //   .pipe(
    //     filter(isConfirmed => isConfirmed),
    //     switchMap(_ => this.merchantSvc.deleteMerchant(id)),
    //     switchMap(response => this.swalAlert('Success', response.message, 'success'))
    //   ).subscribe(_ => this.agGrid.gridOptions.api.refreshInfiniteCache());
  }
}
