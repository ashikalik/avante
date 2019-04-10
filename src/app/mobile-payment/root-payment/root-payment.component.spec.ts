import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootPaymentComponent } from './root-payment.component';

describe('RootPaymentComponent', () => {
  let component: RootPaymentComponent;
  let fixture: ComponentFixture<RootPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
