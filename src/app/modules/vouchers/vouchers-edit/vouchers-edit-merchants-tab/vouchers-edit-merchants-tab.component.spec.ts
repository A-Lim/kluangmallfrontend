import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VouchersEditMerchantsTabComponent } from './vouchers-edit-merchants-tab.component';

describe('VouchersEditMerchantsTabComponent', () => {
  let component: VouchersEditMerchantsTabComponent;
  let fixture: ComponentFixture<VouchersEditMerchantsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VouchersEditMerchantsTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VouchersEditMerchantsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
