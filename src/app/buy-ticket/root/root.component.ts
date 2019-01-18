import { Component, OnInit } from '@angular/core';
import { EventService } from "../../api-services/event.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { EventDetails } from "../../models/event-details";
import { BuyTicketService } from '../../api-services/buy-ticket.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  public setps: boolean[];
  public eventKey: string;
  public eventDetail: EventDetails;
  public isPaymentOpend: boolean;

  public payment: FormGroup;
  public visitors: FormArray


  constructor(public eventService: EventService,
    public buyTicketService: BuyTicketService,
    public activatedRout: ActivatedRoute,
    public formBuilder: FormBuilder,
    public router: Router) {

    this.activatedRout.params.subscribe(params => {
      this.eventKey = params['id'];
    });

    //this.getEventDetail();

    this.setps = [true, false, false, false];
    this.initForm();
  }

  ngOnInit() {
  }


  public initForm() {
    this.payment = this.formBuilder.group(
      {
        'first_name': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(40)])],
        'last_name': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(40)])],
        'mobile': ['', Validators.compose([Validators.required, Validators.pattern('^(05)([0-9]{8})$')])],
        'email': ['', Validators.compose([Validators.required, Validators.email])],
        'package_id': ['', Validators.compose([Validators.required])],
        'num_ticket': ['', Validators.compose([Validators.required])],
        'visitors': this.formBuilder.array([]),
        'access_date': [null],
        'card_holder': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(40)])],
        'card_number': ['', Validators.compose([Validators.required, Validators.pattern('^([0-9]{16})$')])],
        'month_expire': ['', Validators.compose([Validators.required, Validators.pattern('^(0[1-9]|1[0-2])$')])],
        'year_expire': ['', Validators.compose([Validators.required, Validators.pattern('^(2[0-1])(1[8-9]|2[0-9])$')])],
        'csv': ['', Validators.compose([Validators.required, Validators.pattern('^([0-9]{3})$')])],
        'callback_url': ['', Validators.compose([])],
        'amount': ['', Validators.compose([])],
        'recaptcha': [null, Validators.compose([Validators.required])],
      });

    // to update the num of tickets when the value has been changed
    //this.updateNumberOfTickets();
    //this.onChangeAccessDate();
  }

  public getEventDetail() {
    this.eventService.getEventDetail(this.eventKey).subscribe(
      res => {
        this.eventDetail = res;

        //to check if the payment is opned or not
        if (this.eventDetail.data.details.ticket_payment == 1) {
          this.isPaymentOpend = true;
        } else {
          this.isPaymentOpend = false;
          this.router.navigate(['/event/' + this.eventKey]);
        }
      }
    )
  }



  public changeStepForward(event: any) {
    if(this.setps[0] == true){
      this.setps = [false, true, false, false];      
    }
    else if (this.setps[1] == true){
      this.setps = [false, false, true, false];      
    }
    else if (this.setps[2] == true){
      this.setps = [false, false, false, true];      
    }
    else if (this.setps[3] == true){
      this.setps = [false, false, false, false];      
    }
  }
  
  public changeStepBackward(event: any) {
    if(this.setps[0] == true){
      this.router.navigate(['/event/' + this.eventKey]);
    }
    else if (this.setps[1] == true){
      this.setps = [true, false, false, false];
    }
    else if (this.setps[2] == true){
      this.setps = [false, true, false, false];      
    }

  }

}
