import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersEditPointsTabComponent } from './users-edit-points-tab.component';

describe('UsersEditPointsTabComponent', () => {
  let component: UsersEditPointsTabComponent;
  let fixture: ComponentFixture<UsersEditPointsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersEditPointsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersEditPointsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
