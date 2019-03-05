import { ValidatePaymentRoutingModule } from './validate-payment-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponent } from './root/root.component';
import { BASE_MODULES } from '../models/modules';

@NgModule({
  declarations: [RootComponent],
  imports: [
    CommonModule,
    ...BASE_MODULES,
    ValidatePaymentRoutingModule
  ]
})
export class ValidatePaymentModule { }
