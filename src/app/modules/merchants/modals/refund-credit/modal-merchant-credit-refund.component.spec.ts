import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantCreditRefundModalComponent } from './modal-merchant-credit-refund.component';

describe('MerchantCreditRefundModalComponent', () => {
  let component: MerchantCreditRefundModalComponent;
  let fixture: ComponentFixture<MerchantCreditRefundModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantCreditRefundModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantCreditRefundModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
