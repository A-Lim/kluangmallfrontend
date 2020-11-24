import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, of, concat } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';

import { Base } from 'app/shared/components/base.component';
import { NgForm } from '@angular/forms';

import { Event } from 'app/modules/events/models/event.model';
import { BannerVm } from 'app/modules/banners/models/banner.model.vm';
import { Promotion } from 'app/modules/promotions/models/promotion.model';
import { EventService } from 'app/modules/events/events.service';
import { BannerService } from 'app/modules/banners/banners.service';
import { PromotionService } from 'app/modules/promotions/promotions.service';

@Component({
  selector: 'banners-edit',
  templateUrl: './banners-edit.component.html',
  styleUrls: ['./banners-edit.component.css']
})
export class BannersEditComponent extends Base implements OnInit, OnDestroy {

  @ViewChild('form')
  form: NgForm;

  id: number;
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
    this.setTitle('Edit Banner');
    this.bannerVm = new BannerVm();

    this.loadBanner();
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
    this.bannerSvc.updateBanner(this.id, this.bannerVm)
      .pipe(switchMap(response => this.swalAlert('Success', response.message, 'success')))
      .subscribe(_ => {
        this.isLoading = false;
        this.router.navigate(['admin/banners']);
      }, _ => { this.isLoading = false; });
  }

  loadBanner() {
    this.isLoading = true;
    this.id = +this.route.snapshot.paramMap.get('id');

    this.bannerSvc.getBanner(this.id)
      .subscribe(response => {
        this.bannerVm = <BannerVm> {
          title: response.data.title,
          status: response.data.status,
          image: response.data.image != null ? [response.data.image] : [],
          uploadImage: [],
          is_clickable: response.data.is_clickable,
          type: response.data.type,
          type_id: response.data.type_id,
        };
        this.isLoading = false;
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