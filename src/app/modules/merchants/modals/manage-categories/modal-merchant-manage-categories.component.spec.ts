import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantManageCategoriesModalComponent } from './modal-merchant-manage-categories.component';

describe('MerchantManageCategoriesModalComponent', () => {
  let component: MerchantManageCategoriesModalComponent;
  let fixture: ComponentFixture<MerchantManageCategoriesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantManageCategoriesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantManageCategoriesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
