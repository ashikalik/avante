import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonService} from "../../api-services/common.service";
import {Region} from "../../models/region";
import {EventType} from "../../models/event-type";
import {EventService} from "../../api-services/event.service";
import {LatestEvent} from "../../models/latest-event";
import {Router} from "@angular/router";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

    public region: Region;
    public eventTypes: EventType;
    public latestEvent: LatestEvent;

    constructor(public commonService: CommonService,
                public eventService: EventService,
                public router: Router) {
    }

    ngOnInit() {
        this.getRegion();
        this.getEventType();
        this.getLatestEvent();
    }


    ngOnDestroy(): void {
    }

    getRegion(): void {
       this.commonService.getRegion().subscribe(res => {
           this.region = res;
       }, err => {

       })
    }

    getEventType(): void {
        this.commonService.getEventType().subscribe(res => {
            this.eventTypes = res;
        }, err => {

        })
    }

    getLatestEvent(): void {
        this.eventService.getLatestEvent().subscribe(res => {
            this.latestEvent = res;
        }, err => {

        });
    }

    public onMoreDetails(eventKey: string) {
        console.log(eventKey)
        this.router.navigate(['/event/' + eventKey]);
    }

    public onSearch() {
        this.router.navigate(['/search']);
    }



}
