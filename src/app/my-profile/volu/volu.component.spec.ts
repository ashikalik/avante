import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoluComponent } from './volu.component';

describe('VoluComponent', () => {
  let component: VoluComponent;
  let fixture: ComponentFixture<VoluComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoluComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoluComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
