import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemSettingsRedemptionTabComponent } from './systemsettings-redemption-tab.component';

describe('SystemSettingsRedemptionTabComponent', () => {
  let component: SystemSettingsRedemptionTabComponent;
  let fixture: ComponentFixture<SystemSettingsRedemptionTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemSettingsRedemptionTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemSettingsRedemptionTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
