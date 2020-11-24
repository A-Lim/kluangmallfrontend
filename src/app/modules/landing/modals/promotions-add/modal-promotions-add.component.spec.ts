import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionsAddModalComponent } from './modal-promotions-add.component';

describe('PromotionsAddModalComponent', () => {
  let component: PromotionsAddModalComponent;
  let fixture: ComponentFixture<PromotionsAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionsAddModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionsAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
