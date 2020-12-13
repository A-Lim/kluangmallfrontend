import { AfterViewInit, Component, EventEmitter, Input, OnInit, OnDestroy, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Base } from 'app/shared/components/base.component';
import { FORMSTATUS } from 'app/shared/constants/formstatus.constants';
import { UserGroupService } from 'app/modules/usergroups/usergroups.service';
import { SystemSettingVm } from 'app/modules/systemsettings/models/systemsetting.model.vm';

@Component({
  selector: 'systemsettings-general-tab',
  templateUrl: './systemsettings-general-tab.component.html',
  styleUrls: ['./systemsettings-general-tab.component.css']
})
export class SystemSettingsGeneralTabComponent extends Base implements OnInit, OnDestroy, AfterViewInit {
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

  Editor = ClassicEditor;
  
  constructor() { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    this.form.statusChanges.pipe(
      debounceTime(100),
      takeUntil(this.destroy$)
    ).subscribe(status => this.formValid.emit(status !== FORMSTATUS.INVALID));
  }
}
