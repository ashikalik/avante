import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageRowComponent } from './package-row.component';

describe('PackageRowComponent', () => {
  let component: PackageRowComponent;
  let fixture: ComponentFixture<PackageRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
