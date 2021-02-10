import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersEditReceiptsTabComponent } from './users-edit-receipts-tab.component';

describe('UsersEditReceiptsTabComponent', () => {
  let component: UsersEditReceiptsTabComponent;
  let fixture: ComponentFixture<UsersEditReceiptsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersEditReceiptsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersEditReceiptsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
