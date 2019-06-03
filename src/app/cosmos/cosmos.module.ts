import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponent } from './root/root.component';
import { BASE_MODULES } from '../models/modules';
import { BuyTicketService } from '../api-services/buy-ticket.service';
import { CosmosRoutingModule } from './cosmos-routing.module';
import { CosmosService } from '../api-services/cosoms.service';

@NgModule({
  declarations: [RootComponent],
  imports: [
    CosmosRoutingModule,
    ...BASE_MODULES
],
providers: [
    BuyTicketService,
    CosmosService
]
})
export class CosmosModule { }
