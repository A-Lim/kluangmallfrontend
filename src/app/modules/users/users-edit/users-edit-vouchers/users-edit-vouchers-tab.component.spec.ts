import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersEditVouchersTabComponent } from './users-edit-vouchers-tab.component';

describe('UsersEditVouchersTabComponent', () => {
  let component: UsersEditVouchersTabComponent;
  let fixture: ComponentFixture<UsersEditVouchersTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersEditVouchersTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersEditVouchersTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
