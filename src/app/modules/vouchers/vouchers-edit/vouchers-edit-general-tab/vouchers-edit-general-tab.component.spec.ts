import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VouchersEditGeneralTabComponent } from './vouchers-edit-general-tab.component';

describe('VouchersEditGeneralTabComponent', () => {
  let component: VouchersEditGeneralTabComponent;
  let fixture: ComponentFixture<VouchersEditGeneralTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VouchersEditGeneralTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VouchersEditGeneralTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
