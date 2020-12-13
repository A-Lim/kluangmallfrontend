import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantCreditTopUpModalComponent } from './modal-merchant-credit-topup.component';

describe('MerchantCreditTopUpModalComponent', () => {
  let component: MerchantCreditTopUpModalComponent;
  let fixture: ComponentFixture<MerchantCreditTopUpModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantCreditTopUpModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantCreditTopUpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
