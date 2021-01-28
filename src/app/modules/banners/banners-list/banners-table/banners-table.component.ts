import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { BaseAgGrid } from 'app/shared/components/baseaggrid.component';
import { BannerService } from 'app/modules/banners/banners.service';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'banners-table',
  templateUrl: './banners-table.component.html',
  styleUrls: ['./banners-table.component.css']
})
export class BannersTableComponent extends BaseAgGrid implements OnInit {
  @ViewChild('imageCell', { static: true }) imageCell: TemplateRef<any>;
  @ViewChild('actionsCell', { static: true }) actionsCell: TemplateRef<any>;
  @ViewChild('statusCell', { static: true }) statusCell: TemplateRef<any>;

  @Input()
  app: string;

  constructor(private bannerSvc: BannerService) { 
    super()
  }

  ngOnInit() {
    super.ngOnInit();

    this.gridOptions.rowHeight = 70;
    this.columnDefs = [
      this.getIndexColDef(),
      this.getTemplateColDef('Image', 'image', 120, false, this.imageCell),
      this.getColDef('Title', 'title', true, true),
      this.getStatusColDef('Status', 'status', 100, false, this.statusCell),
      this.getActionColDef('Action', '', 110, this.actionsCell),
    ];

    this.dataSourceCallBack = (params: any) => {
      params.app = 'equals:' + this.app;
      return this.bannerSvc.getBanners(params);
    }

    this.setDataSource();
  }

  delete(id: number) {
    this.swalConfirm('Confirm', 'Are you sure you want to delete this banner?', 'warning', 'Delete')
      .pipe(
        filter(isConfirmed => isConfirmed),
        switchMap(_ => this.bannerSvc.deleteBanner(id)),
        switchMap(response => this.swalAlert('Success', response.message, 'success'))
      ).subscribe(_ => this.refreshTable());
  }
}
