import {Component, Input, OnInit} from '@angular/core';
import {Ticket} from "../../models/tickets";

@Component({
    selector: 'app-single-ticket',
    templateUrl: './single-ticket.component.html',
    styleUrls: ['./single-ticket.component.scss']
})
export class SingleTicketComponent implements OnInit {

    @Input() ticket: Ticket;
    @Input() index: number;
    public showTicket: boolean;

    constructor() {
        this.showTicket = false;
    }

    ngOnInit() {
    }

    public onShow() {
        this.showTicket = !this.showTicket;
    }

}
