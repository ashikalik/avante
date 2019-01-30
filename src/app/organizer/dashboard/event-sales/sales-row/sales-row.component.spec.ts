import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesRowComponent } from './sales-row.component';

describe('SalesRowComponent', () => {
  let component: SalesRowComponent;
  let fixture: ComponentFixture<SalesRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
