import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantsCreateComponent } from './merchants-create.component';

describe('MerchantsCreateComponent', () => {
  let component: MerchantsCreateComponent;
  let fixture: ComponentFixture<MerchantsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
