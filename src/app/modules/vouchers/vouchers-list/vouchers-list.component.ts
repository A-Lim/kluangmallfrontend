import { Component, OnInit, OnDestroy } from '@angular/core';
import { filter, switchMap } from 'rxjs/operators';
import { Base } from 'app/shared/components/base.component';

@Component({
  selector: 'vouchers-list',
  templateUrl: './vouchers-list.component.html',
  styleUrls: ['./vouchers-list.component.css']
})
export class VouchersListComponent extends Base implements OnInit, OnDestroy {

  isVouchersTabLoaded: boolean = false;
  isTransactionsTabLoaded: boolean = false;

  constructor() { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitle('Vouchers');
  }

  onTabClick(tab: VoucherTab) {
    switch (tab) {
      case VoucherTab.Vouchers:
        this.isVouchersTabLoaded = true;
        break;
      
      case VoucherTab.Transactions:
        this.isTransactionsTabLoaded = true;
        break;

      default:
        break;
    }
  }

  get VoucherTab() {
    return VoucherTab;
  }
}

enum VoucherTab {
  Vouchers,
  Transactions
}