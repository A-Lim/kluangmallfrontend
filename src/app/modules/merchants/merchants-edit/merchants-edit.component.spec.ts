import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantsEditComponent } from './merchants-edit.component';

describe('MerchantsEditComponent', () => {
  let component: MerchantsEditComponent;
  let fixture: ComponentFixture<MerchantsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
