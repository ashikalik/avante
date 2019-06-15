import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerReportComponent } from './seller-report.component';

describe('SellerReportComponent', () => {
  let component: SellerReportComponent;
  let fixture: ComponentFixture<SellerReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
