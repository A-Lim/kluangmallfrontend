import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackDetailsModalComponent } from './modal-feedback-details.component';

describe('FeedbackDetailsModalComponent', () => {
  let component: FeedbackDetailsModalComponent;
  let fixture: ComponentFixture<FeedbackDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackDetailsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
