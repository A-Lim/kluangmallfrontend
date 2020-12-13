import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiLogsListComponent } from './apilogs-list.component';

describe('ApiLogsListComponent', () => {
  let component: ApiLogsListComponent;
  let fixture: ComponentFixture<ApiLogsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiLogsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiLogsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
