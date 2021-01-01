import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementsEditComponent } from './announcements-edit.component';

describe('AnnouncementsEditComponent', () => {
  let component: AnnouncementsEditComponent;
  let fixture: ComponentFixture<AnnouncementsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnouncementsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
