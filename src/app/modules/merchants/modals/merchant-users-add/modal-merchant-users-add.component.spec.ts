import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantUsersAddModalComponent } from './modal-merchant-users-add.component';

describe('MerchantUsersAddModalComponent', () => {
  let component: MerchantUsersAddModalComponent;
  let fixture: ComponentFixture<MerchantUsersAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantUsersAddModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantUsersAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
