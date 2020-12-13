import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantsEditAccountTabComponent } from './merchants-edit-account-tab.component';

describe('MerchantsEditAccountTabComponent', () => {
  let component: MerchantsEditAccountTabComponent;
  let fixture: ComponentFixture<MerchantsEditAccountTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantsEditAccountTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantsEditAccountTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
