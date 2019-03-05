import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPackagesComponent } from './event-packages.component';

describe('EventPackagesComponent', () => {
  let component: EventPackagesComponent;
  let fixture: ComponentFixture<EventPackagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventPackagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
