import {Component, OnInit} from '@angular/core';
import {CommonService} from "../../api-services/common.service";
import {EventType} from "../../models/event-type";
import {EventService} from "../../api-services/event.service";
import {Router} from "@angular/router";
import {Region} from '../../models/region';
import {SearchService} from "../../services/search.service";
import {SearchEvents} from "../../models/search-events";
import {Meta, Title} from "@angular/platform-browser";

@Component({
    selector: 'app-search-event',
    templateUrl: './search-event.component.html',
    styleUrls: ['./search-event.component.scss']
})
export class SearchEventComponent implements OnInit {

    public regionList: Region;
    public eventTypes: EventType;
    public searchResult: SearchEvents;

    public limit: number;
    public page: number;

    constructor(
        public commonService: CommonService,
        public eventService: EventService,
        public searchService: SearchService,
        public title: Title,
        public meta: Meta,
        public router: Router) {
        this.resetSearch();
    }

    ngOnInit() {
        this.title.setTitle('ايفينتو');
        this.meta.addTag({name: "description", content: 'ايفينتو منصة إلكترونية لإدارة وتنظيم الفعاليات'})

        console.log(this.searchService)
        this.getRegion();
        this.getEventType();
        this.search();
    }


    resetSearch() {
        if (!this.searchService.name)
            this.searchService.name = '';
        if (!this.searchService.need_vol)
            this.searchService.need_vol = '';
        if (!this.searchService.type)
            this.searchService.type = '';
        if (!this.searchService.region)
            this.searchService.region = '';
        this.limit = 20;
        this.page = 1;
    }

    public getRegion() {
        this.commonService.getRegion().subscribe(res => {
            this.regionList = res;
        }, err => {

        })
    }

    public getEventType() {
        this.commonService.getEventType().subscribe(res => {
            this.eventTypes = res;
        }, err => {

        })
    }

    public search() {
        this.eventService.search(this.limit, this.page, this.searchService.name, this.searchService.type, this.searchService.region, this.searchService.need_vol).subscribe(
            res => {
                this.searchResult = res
            }, err => {

            }
        );
    }

    public searchAll() {
        this.resetSearch();
        this.searchService.name = '';
        this.searchService.need_vol = '';
        this.searchService.type = '';
        this.searchService.region = '';
        this.search();
    }


}
