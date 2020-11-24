import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantsEditGeneralTabComponent } from './merchants-edit-general-tab.component';

describe('MerchantsEditGeneralTabComponent', () => {
  let component: MerchantsEditGeneralTabComponent;
  let fixture: ComponentFixture<MerchantsEditGeneralTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantsEditGeneralTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantsEditGeneralTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
