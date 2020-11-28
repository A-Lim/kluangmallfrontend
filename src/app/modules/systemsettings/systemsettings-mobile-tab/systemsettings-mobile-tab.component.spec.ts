import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemSettingsMobileTabComponent } from './systemsettings-mobile-tab.component';

describe('SystemSettingsMobileTabComponent', () => {
  let component: SystemSettingsMobileTabComponent;
  let fixture: ComponentFixture<SystemSettingsMobileTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemSettingsMobileTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemSettingsMobileTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
