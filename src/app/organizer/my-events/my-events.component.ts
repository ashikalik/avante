import { Component, OnInit } from '@angular/core';
import { EventService } from "../../api-services/event.service";
import { LatestEvent } from '../../models/latest-event';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.scss']
})
export class MyEventsComponent implements OnInit {

  public myEvents: LatestEvent;

  constructor(public eventService: EventService,
    public router: Router) {


  }

  ngOnInit() {
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
    this.router.navigate(['create-event'])
  }

  public onEvent(event_ket: string) {
    this.router.navigate(['/organizer/event/' + event_ket])
  }

}
