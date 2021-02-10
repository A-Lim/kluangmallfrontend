import { Component, OnInit } from '@angular/core';
import { Base } from 'app/shared/components/base.component';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'app/modules/users/users.service';
import { User } from 'app/modules/users/models/user.model';
import { UserVm } from 'app/modules/users/models/user.model.vm';

@Component({
  selector: 'users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css']
})
export class UsersEditComponent extends Base implements OnInit {
  user: User;
  // userVm: UserVm;

  isGeneralTabLoaded: boolean = true;
  isVouchersTabLoaded: boolean = false;
  isVoucherTransactionsTabLoaded: boolean = false;
  isPointsTabLoaded: boolean = false;
  isReceiptsTabLoaded: boolean = false;

  constructor(private route: ActivatedRoute, private userSvc: UserService) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitle('Edit User');
    this.loadUser();
  }
  
  loadUser() {
    this.isLoading = true;
    const id = +this.route.snapshot.paramMap.get('id');

    this.userSvc.getUser(id)
      .subscribe(result => {
        this.user = result.data;
        this.isLoading = false;
      }, _ => { this.isLoading = false; });
  }

  onTabClick(tab: UserEditTab) {
    switch (tab) {
      case UserEditTab.General:
        this.isGeneralTabLoaded = true;
        break;
      
      case UserEditTab.Vouchers:
        this.isVouchersTabLoaded = true;
        break;
      
      case UserEditTab.VoucherTransactions:
        this.isVoucherTransactionsTabLoaded = true;
        break;
      
      case UserEditTab.Points:
        this.isPointsTabLoaded = true;
        break;

      case UserEditTab.Receipts:
        this.isReceiptsTabLoaded = true;
        break;

      default:
        break;
    }
  }

  get UserEditTab() {
    return UserEditTab;
  }
}

enum UserEditTab {
  General, 
  Vouchers,
  VoucherTransactions,
  Points,
  Receipts
}
