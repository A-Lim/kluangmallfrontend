import { Component, OnInit, ViewChild } from '@angular/core';

import { Base } from 'app/shared/components/base.component';
import { CustomOverlayRef } from 'app/shared/helpers/customoverlayref';
import { MerchantVm } from 'app/modules/merchants/models/merchant.model.vm';
import { MerchantUserVm } from 'app/modules/merchants/models/merchant-user.model.vm';
import { MerchantService } from 'app/modules/merchants/merchants.service';
import { switchMap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Merchant } from '../../models/merchant.model';

@Component({
  selector: 'modal-merchant-users-add',
  templateUrl: './modal-merchant-users-add.component.html',
  styleUrls: ['./modal-merchant-users-add.component.css']
})
export class MerchantUsersAddModalComponent extends Base implements OnInit {
  @ViewChild('form')
  form: NgForm;
  
  merchant: Merchant;
  merchantUsers: MerchantUserVm[];

  constructor(public merchantSvc: MerchantService,
    private ref: CustomOverlayRef<MerchantUserVm[], Merchant>) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.merchant = this.ref.data;
    this.merchantUsers = [new MerchantUserVm()];
  }

  close() {
    this.ref.close();
  }

  addUser() {
    this.merchantUsers.push(new MerchantUserVm());
  }

  removeUser(index: number) {
    this.merchantUsers.splice(1, index);
  }

  trackByFn(index: number) {
    return index;
  }

  onSubmit() {
    this.submitted = true;

    if (!this.form.valid)
      return;

    this.isLoading = true;
    this.merchantSvc.addUsers(this.merchant.id, this.merchantUsers)
      .pipe(
        switchMap(response => this.swalAlert('Success', response.message, 'success'))
      )
      .subscribe(_ => {
        this.isLoading = false;
        this.ref.save(this.merchantUsers);
      }, _ => this.isLoading = false);
  }
}