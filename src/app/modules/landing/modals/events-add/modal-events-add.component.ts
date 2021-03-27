import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { BaseAgGrid } from 'app/shared/components/baseaggrid.component';
import { CustomOverlayRef } from 'app/shared/helpers/customoverlayref';
import { EventService } from 'app/modules/events/events.service';
import { Event } from 'app/modules/events/models/event.model';

@Component({
  selector: 'modal-events-add',
  templateUrl: './modal-events-add.component.html',
  styleUrls: ['./modal-events-add.component.css']
})
export class EventsAddModalComponent extends BaseAgGrid implements OnInit {
  @ViewChild('actionsCell', { static: true }) actionsCell: TemplateRef<any>;
  @ViewChild('statusCell', { static: true }) statusCell: TemplateRef<any>;

  events: Event[];

  constructor(public eventSvc: EventService,
    private ref: CustomOverlayRef<Event[], Event[]>) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.events = this.ref.data;
    this.columnDefs = [
      this.getIndexColDef(),
      this.getColDef('Title', 'title', true, true),
      this.getColDef('Category', 'category', true, true),
      this.getDateColDef('From Date', 'fromDate'),
      this.getDateColDef('To Date', 'toDate'),
      this.getStatusColDef('Status', 'status', 100, false, this.statusCell),
      this.getActionColDef('Action', '', 110, this.actionsCell),
    ];

    this.dataSourceCallBack = (params: any) => {
      params['status'] = 'equals:active';
      return this.eventSvc.getEvents(params);
    }
    
    this.setDataSource();
  }

  close() {
    this.ref.close();
  }

  add(event: Event) {
    if (!this.events.some(x => x.id === event.id)) {
      this.events.push(event);
    }
  }

  remove(index: number) {
    this.events.splice(index, 1);
  }

  addEvents() {
    this.ref.save(this.events);
  }
  
}