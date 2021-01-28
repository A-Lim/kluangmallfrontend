import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemSettingsCreditTabComponent } from './systemsettings-credit-tab.component';

describe('SystemSettingsCreditTabComponent', () => {
  let component: SystemSettingsCreditTabComponent;
  let fixture: ComponentFixture<SystemSettingsCreditTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemSettingsCreditTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemSettingsCreditTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
