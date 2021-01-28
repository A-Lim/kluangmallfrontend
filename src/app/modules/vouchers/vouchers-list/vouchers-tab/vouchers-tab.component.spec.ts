import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VouchersTabComponent } from './vouchers-tab.component';

describe('VouchersTabComponent', () => {
  let component: VouchersTabComponent;
  let fixture: ComponentFixture<VouchersTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VouchersTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VouchersTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
