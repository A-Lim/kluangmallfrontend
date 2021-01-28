import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Base } from 'app/shared/components/base.component';
import { NgForm } from '@angular/forms';

import { Event } from 'app/modules/events/models/event.model';
import { Promotion } from 'app/modules/promotions/models/promotion.model';
import { BannerVm } from 'app/modules/banners/models/banner.model.vm';
import { EventService } from 'app/modules/events/events.service';
import { BannerService } from 'app/modules/banners/banners.service';
import { PromotionService } from 'app/modules/promotions/promotions.service';

@Component({
  selector: 'banners-create',
  templateUrl: './banners-create.component.html',
  styleUrls: ['./banners-create.component.css']
})
export class BannersCreateComponent extends Base implements OnInit, OnDestroy {

  @ViewChild('form')
  form: NgForm;

  bannerVm: BannerVm;

  events$: Observable<Event[]>;
  eventsInput$ = new Subject<string>();
  eventsReqLoading: boolean;

  promotions$: Observable<Promotion[]>;
  promotionsInput$ = new Subject<string>();
  promotionsReqLoading: boolean;

  constructor(private bannerSvc: BannerService,
    private eventSvc: EventService,
    private promotionSvc: PromotionService,
    private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitle('Create Banner ');
    this.bannerVm = new BannerVm();
    this.bannerVm.app = this.route.snapshot.data.app;

    this.loadEvents();
    this.loadPromotions();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  onIsClickableChange($event) {
    if (!$event.value) {
      this.bannerVm.type = null;
      this.bannerVm.type_id = null;
    }
  }

  onSubmit() {
    this.submitted = true;
  
    // validate form
    if (!this.form.valid)
      return;

    this.isLoading = true;
    
    this.bannerSvc.createBanner(this.bannerVm)
      .pipe(switchMap(response => this.swalAlert('Success', response.message, 'success')))
      .subscribe(_ => {
        this.isLoading = false;
        this.router.navigate(['admin/banners', { queryParams: { tab: this.bannerVm.app } }]);
      }, _ => { this.isLoading = false; });
  }

  loadEvents() {
    this.events$ = concat(
      this.getEventsFn$(), // default items
      this.eventsInput$.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(_ => this.eventsReqLoading = true),
        switchMap(searchStr => this.getEventsFn$(searchStr))
      )
    );
  }

  loadPromotions() {
    this.promotions$ = concat(
      this.getPromotionsFn$(), // default items
      this.promotionsInput$.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(_ => this.promotionsReqLoading = true),
        switchMap(searchStr => this.getPromotionsFn$(searchStr))
      )
    );
  }

  trackByEventFn(event: Event) {
    return event.id;
  }

  trackByPromotionFn(promotion: Promotion) {
    return promotion.id;
  }

  private getEventsFn$(searchStr: string = '') {
    let params: any = { limit: 10, page: 1 };

    if (searchStr != null && searchStr != '')
      params.title = `contains:${searchStr}`;

    return this.eventSvc.getEvents(params).pipe(
      tap(_ => this.eventsReqLoading = false),
      map(response => response.data.data),
      catchError(() => of([])), // empty list on error
    )
  }

  private getPromotionsFn$(searchStr: string = '') {
    let params: any = { limit: 10, page: 1 };

    if (searchStr != null && searchStr != '')
      params.title = `contains:${searchStr}`;

    return this.promotionSvc.getPromotions(params).pipe(
      tap(_ => this.promotionsReqLoading = false),
      map(response => response.data.data),
      catchError(() => of([])), // empty list on error
    )
  }
}