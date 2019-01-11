import { Component, OnInit } from '@angular/core';
import {EventService} from "../../api-services/event.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {EventDetails} from "../../models/event-details";

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss']
})
export class ViewEventComponent implements OnInit {

  public eventKey: string;
  public eventDetail$: Observable<EventDetails>;

  constructor(public eventService: EventService, public activatedRout: ActivatedRoute) {
      this.activatedRout.params.subscribe(params => {
          this.eventKey = params['id'];
      });
  }

  ngOnInit() {
    this.getEventDetail();
  }

  public getEventDetail() {
    this.eventDetail$ = this.eventService.getEventDetail(this.eventKey).pipe();
  }

}
