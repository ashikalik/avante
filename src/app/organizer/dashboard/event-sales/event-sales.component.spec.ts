import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSalesComponent } from './event-sales.component';

describe('EventSalesComponent', () => {
  let component: EventSalesComponent;
  let fixture: ComponentFixture<EventSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
