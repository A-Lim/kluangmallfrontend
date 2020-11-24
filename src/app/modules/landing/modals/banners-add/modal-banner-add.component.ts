import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { filter, switchMap } from 'rxjs/operators';
import { AgGridAngular } from 'ag-grid-angular';
import { NgForm } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { Base } from 'app/shared/components/base.component';
import { ModalSize } from 'app/shared/models/modalsize.enum';
import { LandingService } from 'app/modules/landing/landing.service';
import { BaseAgGrid } from 'app/shared/components/baseaggrid.component';
import { BannerService } from 'app/modules/banners/banners.service';
import { Banner } from 'app/modules/banners/models/banner.model';
import { CustomOverlayRef } from 'app/shared/helpers/customoverlayref';

@Component({
  selector: 'modal-banner-add',
  templateUrl: './modal-banner-add.component.html',
  styleUrls: ['./modal-banner-add.component.css']
})
export class BannersAddModalComponent extends BaseAgGrid implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  @ViewChild('imageCell', { static: true }) imageCell: TemplateRef<any>;
  @ViewChild('actionsCell', { static: true }) actionsCell: TemplateRef<any>;
  @ViewChild('statusCell', { static: true }) statusCell: TemplateRef<any>;

  banners: Banner[];

  constructor(public bannerSvc: BannerService,
    private ref: CustomOverlayRef<Banner[], Banner[]>) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.banners = this.ref.data;
    this.gridOptions.rowHeight = 70;
    this.columnDefs = [
      this.getIndexColDef(),
      this.getTemplateColDef('Image', 'image', 120, false, this.imageCell),
      this.getColDef('Title', 'title', true, true),
      this.getStatusColDef('Status', 'status', 100, false, this.statusCell),
      this.getActionColDef('Action', '', 110, this.actionsCell),
    ];

    this.dataSourceCallBack = (params: any) => {
      params['status'] = 'equals:active';
      return this.bannerSvc.getBanners(params);
    }

    this.setDataSource();
  }

  close() {
    this.ref.close();
  }

  add(banner: Banner) {
    if (!this.banners.some(x => x.id === banner.id)) {
      this.banners.push(banner);
    }
  }

  remove(index: number) {
    this.banners.splice(index, 1);
  }

  addBanners() {
    this.ref.save(this.banners);
  }
}