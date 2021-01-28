import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetNewUsersComponent } from './widget-new-users.component';

describe('WidgetNewUsersComponent', () => {
  let component: WidgetNewUsersComponent;
  let fixture: ComponentFixture<WidgetNewUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetNewUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetNewUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
