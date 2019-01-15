import { Component, OnInit } from '@angular/core';
import { EventService } from "../../api-services/event.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { EventDetails } from "../../models/event-details";


@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  public eventKey: string;
  public eventDetail$: Observable<EventDetails>;
  public isPaymentOpend: boolean

  public setps: boolean[];

  constructor(public eventService: EventService,
    public activatedRout: ActivatedRoute,
    public router: Router) {

    this.activatedRout.params.subscribe(params => {
      this.eventKey = params['id'];
    });

    this.getEventDetail();

    //to check if the payment is opned or not
    this.eventDetail$.subscribe(res=>{
      if(res.data.details.ticket_payment == 1){
        this.isPaymentOpend = true;        
      }else{
        this.isPaymentOpend = false;
        this.router.navigate(['/event/' + this.eventKey]);
      }
    })

    this.setps = [true, false, false, false];
  }

  ngOnInit() {
  }


  public getEventDetail() {
    this.eventDetail$ = this.eventService.getEventDetail(this.eventKey).pipe();
  }

  public changeStep(event: any) {

  }

}
