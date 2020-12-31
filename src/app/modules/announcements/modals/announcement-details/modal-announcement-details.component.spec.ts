import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementDetailsModalComponent } from './modal-announcement-details.component';

describe('AnnouncementDetailsModalComponent', () => {
  let component: AnnouncementDetailsModalComponent;
  let fixture: ComponentFixture<AnnouncementDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementDetailsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
