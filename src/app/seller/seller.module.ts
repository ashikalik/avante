import { PrintBadge } from './../services/print-badge.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerRoutingModule } from './seller-routing.module';
import { BASE_MODULES } from '../models/modules';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { AddTicketComponent } from './add-ticket/add-ticket.component';
import { TicketRowComponent } from './ticket-list/ticket-row/ticket-row.component';
import { SellerService } from '../api-services/seller.service';
import { PickTicketComponent } from './add-ticket/pick-ticket/pick-ticket.component';
import { TicketInfoComponent } from './add-ticket/ticket-info/ticket-info.component';
import { TicketReviewComponent } from './add-ticket/ticket-review/ticket-review.component';
import { PaymentComponent } from './add-ticket/payment/payment.component';
import { BuyTicketService } from '../api-services/buy-ticket.service';
import { EventService } from '../api-services/event.service';

@NgModule({
  declarations: [
    TicketListComponent,
    AddTicketComponent,
    TicketRowComponent,
    PickTicketComponent,
    TicketInfoComponent,
    TicketReviewComponent,
    PaymentComponent
  ],
  imports: [
    SellerRoutingModule,
    ...BASE_MODULES
  ],
  providers: [
    SellerService,
    BuyTicketService,
    EventService,
    PrintBadge,
    Window
  ]
})
export class SellerModule { }
