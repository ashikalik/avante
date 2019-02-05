import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { AddTicketComponent } from './add-ticket/add-ticket.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'tickets',
        pathMatch: 'full'
    },
    {
        path: 'tickets',
        component: TicketListComponent,
    },
    {
        path: 'add-ticket',
        component: AddTicketComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SellerRoutingModule { } 
