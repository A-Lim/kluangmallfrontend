import { Component, OnInit, ViewChild, Input, TemplateRef } from '@angular/core';

import { User } from 'app/modules/users/models/user.model';
import { BaseAgGrid } from 'app/shared/components/baseaggrid.component';
import { ReceiptService } from 'app/modules/users/receipts.service';

@Component({
  selector: 'users-edit-receipts-tab',
  templateUrl: './users-edit-receipts-tab.component.html',
  styleUrls: ['./users-edit-receipts-tab.component.css']
})
export class UsersEditReceiptsTabComponent extends BaseAgGrid implements OnInit {
  @ViewChild('invoiceCell', { static: true }) invoiceCell: TemplateRef<any>;

  @Input()
  user: User;

  constructor(private receiptSvc: ReceiptService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    this.columnDefs = [
      this.getIndexColDef(),
      this.getTemplateColDef('Invoice No', 'invoice_no', 150, false, this.invoiceCell),
      this.getColDef('Merchant', 'merchant', true, true),
      this.getNumberColDef('Amount', 'amount', false, false),
      this.getNumberColDef('Points', 'points', false, false),
      this.getDateColDef('Date', 'date'),
    ];

    this.dataSourceCallBack = (params: any) => {
      params.user_id = `equals:${this.user.id}`;
      return this.receiptSvc.getReceipts(params);
    }

    this.setDataSource();
  }
}
