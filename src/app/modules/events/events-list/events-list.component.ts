import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';

import { EventService } from 'app/modules/events/events.service';
import { BaseAgGrid } from 'app/shared/components/baseaggrid.component';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent extends BaseAgGrid implements OnInit {
  @ViewChild('actionsCell', { static: true }) actionsCell: TemplateRef<any>;
  @ViewChild('statusCell', { static: true }) statusCell: TemplateRef<any>;

  constructor(public eventSvc: EventService) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitle('Events');
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
      return this.eventSvc.getEvents(params);
    }

    this.setDataSource();
  }

  delete(id: number) {
    this.swalConfirm('Confirm', 'Are you sure you want to delete this event?', 'warning', 'Delete')
      .pipe(
        filter(isConfirmed => isConfirmed),
        switchMap(_ => this.eventSvc.deleteEvent(id)),
        switchMap(response => this.swalAlert('Success', response.message, 'success'))
      ).subscribe(_ => this.refreshTable());
  }
}
