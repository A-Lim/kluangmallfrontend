import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetTopMerchantVisitsComponent } from './widget-top-merchant-visits.component';

describe('WidgetTopMerchantVisitsComponent', () => {
  let component: WidgetTopMerchantVisitsComponent;
  let fixture: ComponentFixture<WidgetTopMerchantVisitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetTopMerchantVisitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetTopMerchantVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
