import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootPaymentComponent } from './root-payment/root-payment.component';
import { MobilePaymentRoutingModule } from './mobile-payment-routing.module';
import { BASE_MODULES } from '../models/modules';
import { RouterModule } from '@angular/router';
import { BuyTicketService } from '../api-services/buy-ticket.service';

@NgModule({
  declarations: [RootPaymentComponent],
  imports: [
    CommonModule,
    MobilePaymentRoutingModule,
    ...BASE_MODULES,
    RouterModule
  ],
  providers: [
    BuyTicketService
  ]
})
export class MobilePaymentModule { }
