import {Component, OnInit} from '@angular/core';
import {CommonService} from "../../api-services/common.service";
import {City} from "../../models/city";
import {Observable} from "rxjs";
import {EventType} from "../../models/event-type";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public city$: Observable<City>;
    public eventTypes$: Observable<EventType>;

    constructor(public commonService: CommonService) {
    }

    ngOnInit() {
        this.getCity();
        this.getEventType();
    }

    getCity(): void {
        this.city$ = this.commonService.getCity().pipe();
    }

    getEventType(): void {
        this.eventTypes$ = this.commonService.getEventType().pipe();
    }

}
