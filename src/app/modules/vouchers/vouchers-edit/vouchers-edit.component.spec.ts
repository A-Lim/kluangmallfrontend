import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VouchersEditComponent } from './vouchers-edit.component';

describe('VouchersEditComponent', () => {
  let component: VouchersEditComponent;
  let fixture: ComponentFixture<VouchersEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VouchersEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VouchersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
