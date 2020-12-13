import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantTransactionDetailsModalComponent } from './modal-merchant-transaction-details.component';

describe('MerchantTransactionDetailsModalComponent', () => {
  let component: MerchantTransactionDetailsModalComponent;
  let fixture: ComponentFixture<MerchantTransactionDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantTransactionDetailsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantTransactionDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
