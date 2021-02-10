import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { Base } from 'app/shared/components/base.component';
import { FORMSTATUS } from 'app/shared/constants/formstatus.constants';
import { SystemSettingVm } from 'app/modules/systemsettings/models/systemsetting.model.vm';

@Component({
  selector: 'systemsettings-redemption-tab',
  templateUrl: './systemsettings-redemption-tab.component.html',
  styleUrls: ['./systemsettings-redemption-tab.component.css']
})
export class SystemSettingsRedemptionTabComponent extends Base implements OnInit, AfterViewInit {
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
