import { Component, OnInit, OnDestroy, Input, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject, Observable, concat, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, map, catchError, takeUntil } from 'rxjs/operators';

import { Base } from 'app/shared/components/base.component';
import { UserGroup } from 'app/modules/usergroups/models/usergroup.model';
import { UserGroupService } from 'app/modules/usergroups/usergroups.service';
import { SystemSettingVm } from 'app/modules/systemsettings/models/systemsetting.model.vm';
import { FORMSTATUS } from 'app/shared/constants/formstatus.constants';
import { PermissionModule } from 'app/modules/usergroups/models/permissionmodule.model';
import { CheckBoxGroup, CheckBox } from 'app/shared/models/checkbox.model';

@Component({
  selector: 'systemsettings-auth-tab',
  templateUrl: './systemsettings-auth-tab.component.html',
  styleUrls: ['./systemsettings-auth-tab.component.css']
})
export class SystemSettingsAuthTabComponent extends Base implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('form')
  form: NgForm;
  
  @Input() 
  submitted: boolean;

  @Input()
  isLoading: boolean;

  @Input()
  systemSettingVm: SystemSettingVm;

  @Output()
  formValid = new EventEmitter<boolean>();

  userGroupsReqLoading: boolean;
  userGroupInput$ = new Subject<string>();
  userGroups$: Observable<UserGroup[]>;

  permissionModules: PermissionModule[];
  checkBoxGroups: CheckBoxGroup[];

  constructor(private userGroupSvc: UserGroupService) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.loadUserGroup();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  ngAfterViewInit() {
    this.form.statusChanges.pipe(
      debounceTime(100),
      takeUntil(this.destroy$)
    ).subscribe(status => this.formValid.emit(status !== FORMSTATUS.INVALID));
  }

  loadUserGroup() {
    this.userGroupsReqLoading = false;

    this.userGroups$ = concat(
      this.getUserGroupsFn$(null, this.systemSettingVm.default_usergroups), // default items
      this.userGroupInput$.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(_ => this.userGroupsReqLoading = true),
        switchMap(searchStr => this.getUserGroupsFn$(searchStr))
      )
    );
  }

  trackByFn(userGroup: UserGroup) {
    return userGroup.id;
  }

  private getUserGroupsFn$(searchStr?: string ,ids?: number[]) {
    let params: any = { limit: 10, page: 1, type: 'formcontrol', status: 'equals:active' };

    if (searchStr != null && searchStr != '')
     params.name = `contains:${searchStr}`;

    if (ids && ids.length > 0) {
      ids.forEach(function (id, index) {
        params['id[' + index + ']'] = id;
      });
      // if ids count > 10, override limit 
      params.limit = ids.length > 10 ? ids.length : 10;
    }

    return this.userGroupSvc.getUserGroups(params).pipe(
      tap(_ => this.userGroupsReqLoading = false),
      map(response => response.data.data),
      catchError(() => of([])), // empty list on error
    )
  }
}
