import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionsCreateComponent } from './promotions-create.component';

describe('PromotionsCreateComponent', () => {
  let component: PromotionsCreateComponent;
  let fixture: ComponentFixture<PromotionsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
