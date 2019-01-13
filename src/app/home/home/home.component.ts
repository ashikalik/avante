import {Component, OnInit} from '@angular/core';
import {CommonService} from "../../api-services/common.service";
import {Region} from "../../models/region";
import {Observable} from "rxjs";
import {EventType} from "../../models/event-type";
import {EventService} from "../../api-services/event.service";
import {LatestEvent} from "../../models/latest-event";
import {Router} from "@angular/router";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public region$: Observable<Region>;
    public eventTypes$: Observable<EventType>;
    public latestEvent$: Observable<LatestEvent>;

    constructor(public commonService: CommonService,
                public eventService: EventService,
                public router: Router) {
    }

    ngOnInit() {
        this.getRegion();
        this.getEventType();
        this.getLatestEvent();
    }

    getRegion(): void {
        this.region$ = this.commonService.getRegion().pipe();
    }

    getEventType(): void {
        this.eventTypes$ = this.commonService.getEventType().pipe();
    }

    getLatestEvent(): void {
        this.latestEvent$ = this.eventService.getLatestEvent().pipe();
    }

    public onMoreDetails(eventKey: string) {
        console.log(eventKey)
        this.router.navigate(['/event/' + eventKey]);
    }

    public onSearch() {
        this.router.navigate(['/search']);
    }



}
