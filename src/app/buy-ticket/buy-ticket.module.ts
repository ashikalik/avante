import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyTicketRoutingModule } from './buy-ticket-routing.module';
import { RootComponent } from './root/root.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import { PickTicketComponent } from './pick-ticket/pick-ticket.component';
import { TicketInfoComponent } from './ticket-info/ticket-info.component';
import { TicketReviewComponent } from './ticket-review/ticket-review.component';
import { PaymentComponent } from './payment/payment.component';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [RootComponent, PickTicketComponent, TicketInfoComponent, TicketReviewComponent, PaymentComponent],
  imports: [
    CommonModule,
    BuyTicketRoutingModule,
      TranslateModule.forChild({
          loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
          }
      })

  ]
})
export class BuyTicketModule { }
