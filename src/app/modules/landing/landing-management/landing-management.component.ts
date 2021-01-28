import { Component, OnInit } from '@angular/core';
import { filter, switchMap } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import cloneDeep from 'lodash-es/cloneDeep';

import { Base } from 'app/shared/components/base.component';
import { LandingService } from 'app/modules/landing/landing.service';
import { Landing } from 'app/modules/landing/models/landing.model';
import { Event } from 'app/modules/events/models/event.model';
import { EventsAddModalComponent } from 'app/modules/landing/modals/events-add/modal-events-add.component';
import { ModalSize } from 'app/shared/models/modalsize.enum';
import { Promotion } from 'app/modules/promotions/models/promotion.model';
import { PromotionsAddModalComponent } from '../modals/promotions-add/modal-promotions-add.component';
import { LandingVm } from 'app/modules/landing/models/landing.model.vm';
import { LandingDetail } from 'app/modules/landing/models/landing-detail.model';
import { Banner } from 'app/modules/banners/models/banner.model';
import { BannersAddModalComponent } from '../modals/banners-add/modal-banner-add.component';
import { ActivatedRoute } from '@angular/router';
import Utils from 'app/shared/helpers/utils';

@Component({
  selector: 'landing-management',
  templateUrl: './landing-management.component.html',
  styleUrls: ['./landing-management.component.css']
})
export class LandingManagementComponent extends Base implements OnInit {

  app: string;
  landing: Landing;
  permissions: string[];

  constructor(public landingSvc: LandingService,
    private route: ActivatedRoute) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.app = this.route.snapshot.data.app;
    this.setTitle(Utils.camelCase(this.app) + ' Landing');
    this.landingSvc.getLanding(this.app)
      .subscribe(response => this.landing = response.data);
  }

  update() {
    const landingVm = new LandingVm();
    landingVm.app = this.app;

    landingVm.banners = this.landing.banners.map((x, i) => <LandingDetail> {
      'type': 'banner',
      'type_id': x.id,
      'seq': i + 1,
    });

    if (this.app === 'user') {
      landingVm.events = this.landing.events.map((x, i) => <LandingDetail> {
        'type': 'event',
        'type_id': x.id,
        'seq': i + 1,
      });
  
      landingVm.promotions = this.landing.promotions.map((x, i) => <LandingDetail> {
        'type': 'promotion',
        'type_id': x.id,
        'seq': i + 1,
      });
    }

    this.landingSvc.updateLanding(landingVm)
      .pipe(switchMap(response => this.swalAlert('Success', response.message, 'success')))
      .subscribe(_ => {
        this.isLoading = false;
      }, _ => { this.isLoading = false; });
  }

  addBanners() {
    const data = {
      app: this.app,
      banners: cloneDeep(this.landing.banners ?? [])
    };
  
    this.modalSvc.open<Banner[], { app: string, banners: Banner[] }>(BannersAddModalComponent, data, ModalSize.ExtraLarge)
      .afterClosed$
      .pipe(filter(x => x.type == 'save'))
      .subscribe(closeEvent => this.landing.banners = closeEvent.data);
  }

  addEvents() {
    this.modalSvc.open<Event[], Event[]>(EventsAddModalComponent, cloneDeep(this.landing.events ?? []), ModalSize.ExtraLarge)
      .afterClosed$
      .pipe(filter(x => x.type == 'save'))
      .subscribe(closeEvent => this.landing.events = closeEvent.data);
  }

  addPromotions() {
    this.modalSvc.open<Promotion[], Promotion[]>(PromotionsAddModalComponent, cloneDeep(this.landing.promotions ?? []), ModalSize.ExtraLarge)
      .afterClosed$
      .pipe(filter(x => x.type == 'save'))
      .subscribe(closeEvent => this.landing.promotions = closeEvent.data);
  }

  removeBanner(index: number) {
    this.landing.banners.splice(index, 1);
  }

  removeEvent(index: number) {
    this.landing.events.splice(index, 1);
  }

  removePromotion(index: number) {
    this.landing.promotions.splice(index, 1);
  }
  
  dropEvent(event: CdkDragDrop<Event>) {
    moveItemInArray(this.landing.events, event.previousIndex, event.currentIndex);
  }

  dropPromotion(event: CdkDragDrop<Promotion>) {
    moveItemInArray(this.landing.promotions, event.previousIndex, event.currentIndex);
  }
}