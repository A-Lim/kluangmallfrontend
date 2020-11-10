import { Component, OnInit } from '@angular/core';
import { Base } from 'app/shared/components/base.component';
import { UserGroupService } from 'app/modules/usergroups/usergroups.service';

import { CheckBoxGroup, CheckBox } from 'app/shared/models/checkbox.model';
import { PermissionModule } from 'app/modules/usergroups/models/permissionmodule.model';


@Component({
  selector: 'systemsettings-general-tab',
  templateUrl: './systemsettings-general-tab.component.html',
  styleUrls: ['./systemsettings-general-tab.component.css']
})
export class SystemSettingsGeneralTabComponent extends Base implements OnInit {
  
  constructor(private userGroupSvc: UserGroupService) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
