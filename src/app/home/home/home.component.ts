import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonService} from "../../api-services/common.service";
import {Region} from "../../models/region";
import {EventType} from "../../models/event-type";
import {EventService} from "../../api-services/event.service";
import {LatestEvent} from "../../models/latest-event";
import {Router} from "@angular/router";
import {SearchService} from "../../services/search.service";
import {UserAuthService} from "../../core/user-auth.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

    public region: Region;
    public eventTypes: EventType;
    public latestEvent: LatestEvent;
    public userType: number;
    public isAuthenticated: boolean;


    constructor(public commonService: CommonService,
                public eventService: EventService,
                public searchService: SearchService,
                public userAuthService: UserAuthService,
                public router: Router) {
        this.isAuthenticated = false;
        if (!this.searchService.name)
            this.searchService.name = '';

        if (!this.searchService.need_vol)
            this.searchService.need_vol = '';

        if (!this.searchService.type)
            this.searchService.type = '';

        if (!this.searchService.region)
            this.searchService.region = '';

        if(this.userAuthService.getToken()) {
            this.isAuthenticated = true;
            let profile = this.userAuthService.getUserProfile();
            this.userType = profile.data.user_type;
        }
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
        this.router.navigate(['/event/' + eventKey]);
    }

    public onSearch() {
        console.log(this.searchService)
        this.router.navigate(['/search']);
    }

    public createEvent() {
        if(this.isAuthenticated && this.userType === 2) {
            this.router.navigate(['/organizer/create-event']);
        } else if(this.isAuthenticated && this.userType !== 2) {
            this.router.navigate(['/auth/register']);
        } else {
            this.router.navigate(['/auth/register']);
        }
    }



}
