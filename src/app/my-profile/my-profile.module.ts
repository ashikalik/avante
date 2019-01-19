import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MyProfileRoutingModule} from './my-profile-routing.module';
import {RootComponent} from './root/root.component';
import {UserComponent} from './user/user.component';
import {CompanyComponent} from './company/company.component';
import {VoluComponent} from './volu/volu.component';
import {BASE_MODULES} from "../models/modules";
import {SingleTicketComponent} from './single-ticket/single-ticket.component';
import {ProfileService} from "../api-services/profile.service";
import {InvoicesComponent} from './invoices/invoices.component';
import {SingleInvoiceComponent} from './single-invoice/single-invoice.component';
import {TicketsComponent} from './tickets/tickets.component';

@NgModule({
    declarations: [
        RootComponent,
        UserComponent,
        CompanyComponent,
        VoluComponent,
        SingleTicketComponent,
        InvoicesComponent,
        SingleInvoiceComponent,
        TicketsComponent
    ],
    imports: [
        CommonModule,
        MyProfileRoutingModule,
        ...BASE_MODULES
    ],
    providers: [
        ProfileService
    ]
})
export class MyProfileModule {
}
