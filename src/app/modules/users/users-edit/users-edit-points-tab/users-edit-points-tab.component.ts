import { Component, OnInit, ViewChild, Input, TemplateRef } from '@angular/core';

import { User } from 'app/modules/users/models/user.model';
import { BaseAgGrid } from 'app/shared/components/baseaggrid.component';
import { PointService } from 'app/modules/users/points.service';

@Component({
  selector: 'users-edit-points-tab',
  templateUrl: './users-edit-points-tab.component.html',
  styleUrls: ['./users-edit-points-tab.component.css']
})
export class UsersEditPointsTabComponent extends BaseAgGrid implements OnInit {
  @ViewChild('typeCell', { static: true }) typeCell: TemplateRef<any>;

  @Input()
  user: User;

  constructor(private pointSvc: PointService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    this.columnDefs = [
      this.getIndexColDef(),
      this.getColDef('Description', 'description', false, false),
      this.getNumberColDef('Amount', 'amount', true, true),
      this.getStatusColDef('Type', 'type', 100, false, this.typeCell),
      this.getDateColDef('Date', 'created_at')
    ];

    this.dataSourceCallBack = (params: any) => {
      params.user_id = `equals:${this.user.id}`;
      return this.pointSvc.getPointTransactions(params);
    }

    this.setDataSource();
  }
}
