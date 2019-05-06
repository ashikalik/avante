import { Component, OnInit } from '@angular/core';
import { EventService } from "../../api-services/event.service";
import { LatestEvent } from '../../models/latest-event';
import { Router } from '@angular/router';
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.scss']
})
export class MyEventsComponent implements OnInit {

  public myEvents: LatestEvent;
  public limit: number;
  public page: number;


  constructor(public eventService: EventService,
    public title: Title,
    public meta: Meta,
    public router: Router) {

    this.limit = 20;
    this.page = 1;

  }

  ngOnInit() {
    this.title.setTitle('فعالياتي');
    this.meta.addTag({ name: "description", content: 'فعالياتي' })
    this.getMyEvents();

  }



  public getMyEvents() {
    this.eventService.getMyEvents(this.limit, this.page).subscribe(res => {
      this.myEvents = res;
    }, err => {
    });
  }


  public onCreateEvent() {
    this.router.navigate(['/organizer/create-event'])
  }

  public onEvent(event_ket: string) {
    this.router.navigate(['/organizer/event/' + event_ket])
  }



  goToPage(n: number): void {
    this.page = n;
    this.getMyEvents();
  }

  onNext(): void {
    this.page++;
    this.getMyEvents();
  }

  onPrev(): void {
    this.page--;
    this.getMyEvents();
  }

}
