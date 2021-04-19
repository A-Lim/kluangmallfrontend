import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpdatePointsModalComponent } from './modal-user-update-points.component';

describe('MerchantCreditTopUpModalComponent', () => {
  let component: UserUpdatePointsModalComponent;
  let fixture: ComponentFixture<UserUpdatePointsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserUpdatePointsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUpdatePointsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
