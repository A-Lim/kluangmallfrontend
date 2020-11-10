import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Base } from 'app/shared/components/base.component';
import { NgForm } from '@angular/forms';
import { EventVm } from 'app/modules/events/models/event.model.vm';
import { EventService } from 'app/modules/events/events.service';
import { FileDetail } from 'app/shared/models/filedetail.model';

@Component({
  selector: 'events-edit',
  templateUrl: './events-edit.component.html',
  styleUrls: ['./events-edit.component.css']
})
export class EventsEditComponent extends Base implements OnInit, OnDestroy {

  @ViewChild('form')
  form: NgForm;

  Editor = ClassicEditor;
  eventVm: EventVm;
  id: number;

  constructor(private eventSvc: EventService,
    private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitle('Edit Event');
    this.eventVm = new EventVm();

    this.loadEvent();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  loadEvent() {
    this.isLoading = true;
    this.id = +this.route.snapshot.paramMap.get('id');

    this.eventSvc.getEvent(this.id)
      .subscribe(response => {
        this.eventVm = <EventVm> {
          title: response.data.title,
          category: response.data.category,
          status: response.data.status,
          fromDate: response.data.fromDate,
          toDate: response.data.toDate,
          content: response.data.content,
          thumbnail: response.data.thumbnail != null ? [response.data.thumbnail] : [],
          uploadThumbnail: null,
          images: response.data.images,
          uploadImages: null,
          externalLink: response.data.externalLink
        };

        this.isLoading = false;
      }, _ => { this.isLoading = false; });
  }

  onSubmit() {
    this.submitted = true;
  
    // validate form
    if (!this.form.valid)
      return;

    this.isLoading = true;
    this.eventSvc.updateEvent(this.id, this.eventVm)
      .pipe(switchMap(response => this.swalAlert('Success', response.message, 'success')))
      .subscribe(_ => {
        this.isLoading = false;
        this.router.navigate(['admin/events']);
      }, _ => { this.isLoading = false; });
  }
}