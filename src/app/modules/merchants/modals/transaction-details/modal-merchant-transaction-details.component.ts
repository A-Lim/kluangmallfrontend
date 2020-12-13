import { Component, OnInit, ViewChild } from '@angular/core';

import { Base } from 'app/shared/components/base.component';
import { CustomOverlayRef } from 'app/shared/helpers/customoverlayref';
import { MerchantService } from 'app/modules/merchants/merchants.service';
import { MerchantTransaction } from '../../models/merchant-transaction.model';

@Component({
  selector: 'modal-merchant-transaction-details',
  templateUrl: './modal-merchant-transaction-details.component.html',
  styleUrls: ['./modal-merchant-transaction-details.component.css']
})
export class MerchantTransactionDetailsModalComponent extends Base implements OnInit {

  transaction: MerchantTransaction;

  constructor(public merchantSvc: MerchantService,
    private ref: CustomOverlayRef<MerchantTransaction, null>) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.transaction = this.ref.data;
  }

  close() {
    this.ref.close();
  }
}