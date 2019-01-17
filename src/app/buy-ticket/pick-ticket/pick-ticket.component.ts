import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import { Observable } from "rxjs";
import { EventDetails } from "../../models/event-details";

@Component({
    selector: 'app-pick-ticket',
    templateUrl: './pick-ticket.component.html',
    styleUrls: ['./pick-ticket.component.scss']
})
export class PickTicketComponent implements OnInit {

    @Input() eventDetail$ :Observable<EventDetails>;       
    @Output() onNextTicketInfo: EventEmitter<any> = new EventEmitter();
    

    constructor() {
    }

    ngOnInit() {
    }


    onChangePackage(event){
        console.log(event)
    }
}
