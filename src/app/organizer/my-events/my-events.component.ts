import { Component, OnInit } from '@angular/core';
import { EventService } from "../../api-services/event.service";
import { LatestEvent } from '../../models/latest-event';
import { Router } from '@angular/router';
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.scss']
})
export class MyEventsComponent implements OnInit {

  public myEvents: LatestEvent;

  constructor(public eventService: EventService,
    public title: Title,
    public meta: Meta,
    public router: Router) {


  }

  ngOnInit() {
      this.title.setTitle('فعالياتي');
      this.meta.addTag({name: "description", content: 'فعالياتي'})
      this.getMyEvents();

  }



  public getMyEvents() {
    this.eventService.getMyEvents().subscribe(res => {
      this.myEvents = res;
      console.log(res);
    }, err => {
    });
  }


  public onCreateEvent() {
    this.router.navigate(['/organizer/create-event'])
  }

  public onEvent(event_ket: string) {
    this.router.navigate(['/organizer/event/' + event_ket])
  }

}
