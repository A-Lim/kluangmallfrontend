import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { filter, switchMap } from 'rxjs/operators';
import { AgGridAngular } from 'ag-grid-angular';
import { NgForm } from '@angular/forms';

import { BaseAgGrid } from 'app/shared/components/baseaggrid.component';
import { ModalSize } from 'app/shared/models/modalsize.enum';
import { BannerService } from 'app/modules/banners/banners.service';
import { Banner } from 'app/modules/banners/models/banner.model';
import { CustomOverlayRef } from 'app/shared/helpers/customoverlayref';

@Component({
  selector: 'banners-list',
  templateUrl: './banners-list.component.html',
  styleUrls: ['./banners-list.component.css']
})
export class BannersListComponent extends BaseAgGrid implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  @ViewChild('viewImageModal', { static: true }) viewImageModal: TemplateRef<any>;
  @ViewChild('imageCell', { static: true }) imageCell: TemplateRef<any>;
  @ViewChild('actionsCell', { static: true }) actionsCell: TemplateRef<any>;
  @ViewChild('statusCell', { static: true }) statusCell: TemplateRef<any>;

  @ViewChild('form')
  form: NgForm;

  modalRef: CustomOverlayRef;
  bannerFiles: File[];
  fileTypes: string[] = ['.png', '.jpg', '.jpeg', '.gif'];

  constructor(public bannerSvc: BannerService) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitle('Banners');
    this.columnDefs = [
      this.getIndexColDef(),
      this.getTemplateColDef('Banner', 'path', 100, false, this.imageCell),
      this.getColDef('Name', 'name', true, true),
      this.getStatusColDef('Status', 'status', 100, false, this.statusCell),
      this.getActionColDef('Action', '', 110, this.actionsCell),
    ];

    this.dataSourceCallBack = (params: any) => {
      return this.bannerSvc.getBanners(params);
    }

    this.setDataSource();
  }

  onSubmit() {
    this.submitted = true;
  
    // validate form
    if (!this.form.valid)
      return;

    this.isLoading = true;
    
    this.bannerSvc.createBanners(this.bannerFiles)
      .pipe(switchMap(response => this.swalAlert('Success', response.message, 'success')))
      .subscribe(_ => {
        this.isLoading = false;
        this.submitted = false;
        this.form.reset();
        this.agGrid.gridOptions.api.refreshInfiniteCache()
      }, _ => { this.isLoading = false; });
  }

  viewImage(banner: Banner) {
    this.modalRef = this.modalSvc.open(this.viewImageModal, banner, ModalSize.Medium);
  }

  activate(id: number) {
    this.bannerSvc.activateBanner(id)
      .pipe(switchMap(response => this.swalAlert('Success', response.message, 'success')))
      .subscribe(_ => {
        this.isLoading = false;
        this.agGrid.gridOptions.api.refreshInfiniteCache()
      }, _ => { this.isLoading = false; });
  }

  deactivate(id: number) {
    this.bannerSvc.deactivateBanner(id)
      .pipe(switchMap(response => this.swalAlert('Success', response.message, 'success')))
      .subscribe(_ => {
        this.isLoading = false;
        this.agGrid.gridOptions.api.refreshInfiniteCache()
      }, _ => { this.isLoading = false; });
  }

  delete(id: number) {
    this.swalConfirm('Confirm', 'Are you sure you want to delete this banner?', 'warning', 'Delete')
      .pipe(
        filter(isConfirmed => isConfirmed),
        switchMap(_ => this.bannerSvc.deleteBanner(id)),
        switchMap(response => this.swalAlert('Success', response.message, 'success'))
      ).subscribe(_ => this.agGrid.gridOptions.api.refreshInfiniteCache());
  }

  close() {
    this.modalRef.close();
  }
}