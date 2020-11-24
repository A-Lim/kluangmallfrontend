import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsAddModalComponent } from './modal-events-add.component';

describe('EventsAddModalComponent', () => {
  let component: EventsAddModalComponent;
  let fixture: ComponentFixture<EventsAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsAddModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
