import { Component, OnInit } from '@angular/core';
import { EventService } from "../../api-services/event.service";
import { ActivatedRoute, Router } from "@angular/router";
import { EventDetails } from "../../models/event-details";
import { Meta, Title } from "@angular/platform-browser";
import { EventoError } from '../../models/error';

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

  public errorSubmitRequest: EventoError;



  constructor(public eventService: EventService,
    public activatedRout: ActivatedRoute,
    public title: Title,
    public meta: Meta,
    public router: Router) {
    this.activatedRout.params.subscribe(params => {
      this.eventKey = params['id'];
    });
  }

  ngOnInit() {
    this.errorSubmitRequest = null;
    this.getEventDetail();
  }

  public getEventDetail() {
    this.eventService.getEventDetail(this.eventKey).subscribe(res => {
      if (res.data.details == null)
        this.router.navigate(['/home'])
      this.eventDetail = res;
      this.title.setTitle(this.eventDetail.data.details.name);
      this.meta.addTag({ name: "description", content: this.eventDetail.data.details.details })

    }, err => {
      this.router.navigate(['/home'])
    });
  }

  public buyTicket() {
    if (this.eventKey != '214611584') {
      this.router.navigate(['/buy-ticket/' + this.eventKey]);

    } else {
      this.router.navigate(['/cosmos/' + this.eventKey]);
    }
  }




  public submitRequest() {
    this.errorSubmitRequest = null;
    this.eventService.submitRequest(this.eventKey).subscribe(res => {
      this.getEventDetail();
    }, err => {
      this.errorSubmitRequest = err.value.error;

    });
  }

}
