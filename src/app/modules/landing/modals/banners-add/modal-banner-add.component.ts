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

@Component({
  selector: 'modal-banner-add',
  templateUrl: './modal-banner-add.component.html',
  styleUrls: ['./modal-banner-add.component.css']
})
export class BannersAddModalComponent extends BaseAgGrid implements OnInit {

  constructor(public bannerSvc: BannerService) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  
}