import {Component, Input, OnInit} from '@angular/core';
import {EventDetails} from "../../models/event-details";

@Component({
    selector: 'app-event-description',
    templateUrl: './event-description.component.html',
    styleUrls: ['./event-description.component.scss']
})
export class EventDescriptionComponent implements OnInit {
    @Input() eventDetails: EventDetails;


    constructor() {
    }

    ngOnInit() {
    }

}
