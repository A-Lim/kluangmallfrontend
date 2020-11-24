import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannersEditComponent } from './banners-edit.component';

describe('BannersEditComponent', () => {
  let component: BannersEditComponent;
  let fixture: ComponentFixture<BannersEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannersEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
