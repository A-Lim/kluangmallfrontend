import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Base } from 'app/shared/components/base.component';
import { ProfileVm } from '../models/profile.model.vm';
import { User } from 'app/modules/users/models/user.model';
import { AuthService } from 'app/core/services/auth.service';
import { UserService } from 'app/modules/users/users.service';

@Component({
  selector: 'profile-general-tab',
  templateUrl: './profile-general-tab.component.html',
  styleUrls: ['./profile-general-tab.component.css']
})
export class ProfileGeneralTabComponent extends Base implements OnInit, OnDestroy {
  
  user: User;
  profileVm: ProfileVm;

  @ViewChild('form')
  form: NgForm;

  constructor(public authSvc: AuthService,
    private userSvc: UserService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.loadProfile();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  uploadAvatar($event: Event) {
    const files = (<HTMLInputElement>$event.target).files;

    if (files.length > 0) {
      this.isLoading = true;
      this.authSvc.updateProfileAvatar(files[0])
        .subscribe(response => {
          this.user.avatar = response.data;
          this.isLoading = false;
        }, _ => this.isLoading = false)
    }
  }

  loadProfile() {
    this.isLoading = true;
    this.authSvc.getProfile()
      .subscribe(response => {
        this.user = response.data;
        this.profileVm = <ProfileVm> { 
          name: response.data.name,
          gender: response.data.gender,
          phone: response.data.phone,
          date_of_birth: response.data.date_of_birth,
        };
        this.isLoading = false;
      }, _ => { this.isLoading = false; });
  }

  onSubmit() {
    this.submitted = true;

    // validate form
    if (!this.form.valid)
      return;

    this.isLoading = true;

    this.authSvc.updateProfile(this.profileVm)
      .subscribe(response => {
        this.swalAlert('Success', response.message, 'success');
        this.user = response.data;

        this.profileVm.oldPassword = null;
        this.profileVm.newPassword = null;
        this.profileVm.newPassword_confirmation = null;
        
        this.submitted = false;
        this.isLoading = false;
      }, _ => { this.isLoading = false; });
  }
}
