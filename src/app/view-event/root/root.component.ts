import { Component, OnInit } from '@angular/core';
import {EventService} from "../../api-services/event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {EventDetails} from "../../models/event-details";

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  public eventKey: string;
  public eventDetail: EventDetails;
    lat: number = 51.678418;
    lng: number = 7.809007;


    constructor(public eventService: EventService,
                public activatedRout: ActivatedRoute,
                public router: Router) {
      this.activatedRout.params.subscribe(params => {
          this.eventKey = params['id'];
      });
  }

  ngOnInit() {
    this.getEventDetail();
  }

  public getEventDetail() {
    this.eventService.getEventDetail(this.eventKey).subscribe(res => {
      if(res.data.details == null)
        this.router.navigate(['/home'])
      this.eventDetail = res;
    }, err => {
      console.log(err)
        this.router.navigate(['/home'])
    });
  }

  public buyTicket() {
      this.router.navigate(['/buy-ticket/' + this.eventKey]);
  }

}
