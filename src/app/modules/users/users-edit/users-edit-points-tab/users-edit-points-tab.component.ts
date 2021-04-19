import { Component, OnInit, ViewChild, Input, TemplateRef } from '@angular/core';

import { User } from 'app/modules/users/models/user.model';
import { BaseAgGrid } from 'app/shared/components/baseaggrid.component';
import { PointService } from 'app/modules/users/points.service';
import { UserUpdatePointsModalComponent } from '../../modals/update-points/modal-user-update-points.component';
import { ModalSize } from 'app/shared/models/modalsize.enum';
import { filter, map } from 'rxjs/operators';

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

  addDeductPoints(type: 'add' | 'deduct') {
    const data = { type, user_id: this.user.id };
    this.modalSvc.open(UserUpdatePointsModalComponent, data, ModalSize.Medium)
      .afterClosed$
      .pipe(
        filter(x => x.type == 'save'),
        map(x => x.data)
      )
      .subscribe(points => {
        this.user.points = points;
        this.refreshTable();
      });
  }
}
