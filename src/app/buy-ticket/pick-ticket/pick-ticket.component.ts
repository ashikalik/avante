import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-pick-ticket',
    templateUrl: './pick-ticket.component.html',
    styleUrls: ['./pick-ticket.component.scss']
})
export class PickTicketComponent implements OnInit {

    @Output() onNextTicketInfo: EventEmitter<any> = new EventEmitter();


    constructor() {
    }

    ngOnInit() {
    }

}
