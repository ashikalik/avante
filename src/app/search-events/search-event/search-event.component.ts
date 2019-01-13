import { Component, OnInit } from '@angular/core';
import { CommonService } from "../../api-services/common.service";
import { Observable } from "rxjs";
import { EventType } from "../../models/event-type";
import { EventService } from "../../api-services/event.service";
import { LatestEvent } from "../../models/latest-event";
import { Router } from "@angular/router";
import { Region } from '../../models/region';

@Component({
  selector: 'app-search-event',
  templateUrl: './search-event.component.html',
  styleUrls: ['./search-event.component.scss']
})
export class SearchEventComponent implements OnInit {

  public region$: Observable<Region>;
  public eventTypes$: Observable<EventType>;
  public latestEvent$: Observable<LatestEvent>;

  public type_id: any;
  public name: any;
  public region: any;
  public need_vol: any;
  public limit: number;
  public page: number;

  constructor(public commonService: CommonService,
    public eventService: EventService,
    public router: Router) {
  }

  ngOnInit() {

    this.resetSearch();

    this.getCity();
    this.getEventType();
    this.search();
  }

  resetSearch(){
    this.limit = 20;
    this.page = 1;
    this.name = null;
    this.region = null;
    this.type_id = null;
    this.need_vol = null;
  }

  getCity(): void {
    this.region$ = this.commonService.getRegion().pipe();
  }

  getEventType(): void {
    this.eventTypes$ = this.commonService.getEventType().pipe();
  }


  public search() {
    this.latestEvent$ = this.eventService.search(this.limit, this.page, this.name, this.type_id, this.region, this.need_vol).pipe();
  }

  public searchAll(){
    this.resetSearch()
    this.search();
  }


  public filterRegion(id: any) {
    if (id == this.region) {
      this.region = '';
    } else {
      this.region = id;
    }
  }

  public filterType(id: any) {
    if (id == this.type_id) {
      this.type_id = '';

    } else {
      this.type_id = id;
    }
  }

  public filterVOL(id: any) {
    if (id == this.need_vol) {
      this.need_vol = '';
    } else {
      this.need_vol = id;
    }
  }


}
