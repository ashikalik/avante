import {Component, OnInit, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

    @Input() searchResult: any;

    constructor(public router: Router) {
    }

    ngOnInit() {
    }

    public onMoreDetails(eventKey: string) {
        this.router.navigate(['/event/' + eventKey]);
    }

}
