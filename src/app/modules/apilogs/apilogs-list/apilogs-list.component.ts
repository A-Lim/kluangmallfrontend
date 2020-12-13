import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';

import { BaseAgGrid } from 'app/shared/components/baseaggrid.component';
import { ModalSize } from 'app/shared/models/modalsize.enum';
import { ApiLog } from 'app/modules/apilogs/models/apilog.model';
import { ApiLogService } from 'app/modules/apilogs/apilogs.service';
import { ApiLogDetailsModalComponent } from 'app/modules/apilogs/modals/apilogs-details/modal-apilog-details.component';

@Component({
  selector: 'apilogs-list',
  templateUrl: './apilogs-list.component.html',
  styleUrls: ['./apilogs-list.component.css']
})
export class ApiLogsListComponent extends BaseAgGrid implements OnInit {
  @ViewChild('actionsCell', { static: true }) actionsCell: TemplateRef<any>;

  constructor(public apiLogSvc: ApiLogService) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitle('Api Logs');
    this.columnDefs = [
      this.getIndexColDef(),
      this.getColDef('Method', 'method', true, true),
      this.getColDef('Url', 'url', true, true),
      this.getColDef('Status', 'status', true, true),
      this.getDateColDef('Created At', 'created_at'),
      this.getActionColDef('Action', '', 110, this.actionsCell),
    ];

    this.dataSourceCallBack = (params: any) => {
      return this.apiLogSvc.getFeedbacks(params);
    }

    this.setDataSource();
  }

  showDetails(apilog: ApiLog) {
    this.modalSvc.open(ApiLogDetailsModalComponent, apilog, ModalSize.Large);
  }
}
