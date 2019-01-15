import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-ticket-info',
    templateUrl: './ticket-info.component.html',
    styleUrls: ['./ticket-info.component.scss']
})
export class TicketInfoComponent implements OnInit {
    @Output() onNextTicketInfo: EventEmitter<any> = new EventEmitter();


    constructor() {
    }

    ngOnInit() {
    }

}
