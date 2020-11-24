import { Component, OnInit, ViewChild, OnDestroy, Input, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { filter } from 'rxjs/operators';

import { BaseAgGrid } from 'app/shared/components/baseaggrid.component';
import { MerchantService } from 'app/modules/merchants/merchants.service';
import { MerchantVm } from 'app/modules/merchants/models/merchant.model.vm';
import { MerchantUserVm } from 'app/modules/merchants/models/merchant-user.model.vm';
import { MerchantUsersAddModalComponent } from 'app/modules/merchants/modals/merchant-users-add/modal-merchant-users-add.component';
import { ModalSize } from 'app/shared/models/modalsize.enum';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'merchants-edit-users-tab',
  templateUrl: './merchants-edit-users-tab.component.html',
  styleUrls: ['./merchants-edit-users-tab.component.css']
})
export class MerchantsEditUsersTabComponent extends BaseAgGrid implements OnInit, OnDestroy {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  @ViewChild('actionsCell', { static: true }) actionsCell: TemplateRef<any>;
  @ViewChild('statusCell', { static: true }) statusCell: TemplateRef<any>;
  
  @Input()
  merchantVm: MerchantVm;

  @Input()
  isLoading: boolean;

  @ViewChild('form')
  form: NgForm;

  constructor(private merchantSvc: MerchantService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    this.columnDefs = [
      this.getIndexColDef(),
      this.getColDef('Name', 'name', true, true),
      this.getColDef('Email', 'email', true, true),
      this.getStatusColDef('Status', 'status', 100, false, this.statusCell),
      this.getActionColDef('Action', '', 90, this.actionsCell),
    ];

    this.dataSourceCallBack = (params: any) => {
      return this.merchantSvc.getMerchantUsers(this.merchantVm.id, params);
    }

    this.setDataSource();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  addMerchantUsers() {
    this.modalSvc.open(MerchantUsersAddModalComponent, this.merchantVm, ModalSize.ExtraLarge)
      .afterClosed$
      .pipe(filter(x => x.type == 'save'))
      .subscribe(_ => this.agGrid.gridOptions.api.refreshInfiniteCache());
  }
}