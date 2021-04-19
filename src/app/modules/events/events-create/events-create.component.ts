import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { switchMap } from 'rxjs/operators';

import { Base } from 'app/shared/components/base.component';
import { NgForm } from '@angular/forms';
import { EventVm } from 'app/modules/events/models/event.model.vm';
import { EventService } from 'app/modules/events/events.service';


@Component({
  selector: 'events-create',
  templateUrl: './events-create.component.html',
  styleUrls: ['./events-create.component.css']
})
export class EventsCreateComponent extends Base implements OnInit, OnDestroy {

  @ViewChild('form')
  form: NgForm;

  eventVm: EventVm;

  constructor(private eventSvc: EventService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitle('Create Event');
    this.eventVm = new EventVm();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  onSubmit() {
    this.submitted = true;
  
    // validate form
    if (!this.form.valid)
      return;

    this.isLoading = true;
    
    this.eventSvc.createEvent(this.eventVm)
      .pipe(switchMap(response => this.swalAlert('Success', response.message, 'success')))
      .subscribe(_ => {
        this.isLoading = false;
        this.router.navigate(['admin/events']);
      }, _ => { this.isLoading = false; });
  }
}