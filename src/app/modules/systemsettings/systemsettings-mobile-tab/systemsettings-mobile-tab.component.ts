import { Component, OnInit, Input, OnDestroy, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';

import { SystemSettingVm } from 'app/modules/systemsettings/models/systemsetting.model.vm';
import { Base } from 'app/shared/components/base.component';
import { NgForm } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { FORMSTATUS } from 'app/shared/constants/formstatus.constants';

@Component({
  selector: 'systemsettings-mobile-tab',
  templateUrl: './systemsettings-mobile-tab.component.html',
  styleUrls: ['./systemsettings-mobile-tab.component.css']
})
export class SystemSettingsMobileTabComponent extends Base implements OnInit, OnDestroy, AfterViewInit {
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

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  ngAfterViewInit() {
    this.form.statusChanges.pipe(
      debounceTime(100),
      takeUntil(this.destroy$)
    ).subscribe(status => this.formValid.emit(status !== FORMSTATUS.INVALID));
  }


}
