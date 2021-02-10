import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersEditVoucherTransactionsTabComponent } from './users-edit-voucher-transactions-tab.component';

describe('UsersEditVoucherTransactionsTabComponent', () => {
  let component: UsersEditVoucherTransactionsTabComponent;
  let fixture: ComponentFixture<UsersEditVoucherTransactionsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersEditVoucherTransactionsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersEditVoucherTransactionsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
