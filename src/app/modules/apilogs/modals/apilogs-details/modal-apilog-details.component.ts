import { Component, OnInit, ViewChild } from '@angular/core';

import { Base } from 'app/shared/components/base.component';
import { CustomOverlayRef } from 'app/shared/helpers/customoverlayref';
import { ApiLog } from 'app/modules/apilogs/models/apilog.model';

@Component({
  selector: 'modal-apilog-details',
  templateUrl: './modal-apilog-details.component.html',
  styleUrls: ['./modal-apilog-details.component.css']
})
export class ApiLogDetailsModalComponent extends Base implements OnInit {
  
  apiLog: ApiLog;

  constructor(private ref: CustomOverlayRef<null, ApiLog>) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.apiLog = this.ref.data;
  }

  close() {
    this.ref.close();
  }
}