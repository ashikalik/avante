import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerRootComponent } from './organizer-root.component';

describe('OrganizerRootComponent', () => {
  let component: OrganizerRootComponent;
  let fixture: ComponentFixture<OrganizerRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizerRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizerRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
