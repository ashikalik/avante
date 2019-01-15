import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickTicketComponent } from './pick-ticket.component';

describe('PickTicketComponent', () => {
  let component: PickTicketComponent;
  let fixture: ComponentFixture<PickTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
