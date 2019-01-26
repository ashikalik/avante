import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorRowComponent } from './supervisor-row.component';

describe('SupervisorRowComponent', () => {
  let component: SupervisorRowComponent;
  let fixture: ComponentFixture<SupervisorRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupervisorRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
