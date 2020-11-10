import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemSettingsSocialTabComponent } from './systemsettings-social-tab.component';

describe('SystemSettingsSocialTabComponent', () => {
  let component: SystemSettingsSocialTabComponent;
  let fixture: ComponentFixture<SystemSettingsSocialTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemSettingsSocialTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemSettingsSocialTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
