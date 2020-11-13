import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannersAddModalComponent } from './modal-banner-add.component';

describe('BannersAddModalComponent', () => {
  let component: BannersAddModalComponent;
  let fixture: ComponentFixture<BannersAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannersAddModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannersAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
