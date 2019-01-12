import { Component, OnInit } from '@angular/core';
import { CommonService } from "../../api-services/common.service";
import { City } from "../../models/city";
import { Observable } from "rxjs";
import { EventType } from "../../models/event-type";
import { EventService } from "../../api-services/event.service";
import { LatestEvent } from "../../models/latest-event";
import { Router } from "@angular/router";

@Component({
  selector: 'app-search-event',
  templateUrl: './search-event.component.html',
  styleUrls: ['./search-event.component.scss']
})
export class SearchEventComponent implements OnInit {

  public city$: Observable<City>;
  public eventTypes$: Observable<EventType>;
  public latestEvent$: Observable<LatestEvent>;

  constructor(public commonService: CommonService,
    public eventService: EventService,
    public router: Router) {
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
