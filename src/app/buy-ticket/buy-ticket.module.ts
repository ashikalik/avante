import { NgModule } from '@angular/core';
import { BuyTicketRoutingModule } from './buy-ticket-routing.module';
import { RootComponent } from './root/root.component';
import { PickTicketComponent } from './pick-ticket/pick-ticket.component';
import { TicketInfoComponent } from './ticket-info/ticket-info.component';
import { TicketReviewComponent } from './ticket-review/ticket-review.component';
import { PaymentComponent } from './payment/payment.component';
import { BASE_MODULES } from '../models/modules';
import { EventService } from '../api-services/event.service';
import { BuyTicketService } from '../api-services/buy-ticket.service';

@NgModule({
    declarations: [RootComponent, PickTicketComponent, TicketInfoComponent, TicketReviewComponent, PaymentComponent],
    imports: [
        BuyTicketRoutingModule,
        ...BASE_MODULES
    ],
    providers: [
        BuyTicketService,
        EventService
    ]
})
export class BuyTicketModule { }
