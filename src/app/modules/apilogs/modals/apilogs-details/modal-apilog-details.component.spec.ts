import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiLogDetailsModalComponent } from './modal-apilog-details.component';

describe('ApiLogDetailsModalComponent', () => {
  let component: ApiLogDetailsModalComponent;
  let fixture: ComponentFixture<ApiLogDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiLogDetailsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiLogDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
