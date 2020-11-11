import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingManagementComponent } from './landing-management.component';

describe('LandingManagementComponent', () => {
  let component: LandingManagementComponent;
  let fixture: ComponentFixture<LandingManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
