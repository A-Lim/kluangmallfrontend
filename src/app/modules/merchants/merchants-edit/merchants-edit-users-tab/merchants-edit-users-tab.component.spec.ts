import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantsEditUsersTabComponent } from './merchants-edit-users-tab.component';

describe('MerchantsEditUsersTabComponent', () => {
  let component: MerchantsEditUsersTabComponent;
  let fixture: ComponentFixture<MerchantsEditUsersTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantsEditUsersTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantsEditUsersTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
