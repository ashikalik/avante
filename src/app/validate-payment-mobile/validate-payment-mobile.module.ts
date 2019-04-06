import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BASE_MODULES } from '../models/modules';
import { RootComponent } from './root/root.component';
import { ValidatePaymentMobileRoutingModule } from './validate-payment-mobile-routing.module';

@NgModule({
  declarations: [RootComponent],
  imports: [
    CommonModule,
    ...BASE_MODULES,
    ValidatePaymentMobileRoutingModule
  ]
})
export class ValidatePaymentMobileModule { }
