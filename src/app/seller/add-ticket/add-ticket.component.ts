import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SellerService } from '../../api-services/seller.service';
import { EventoError } from '../../models/error';
import { Package } from '../../models/packages';
import { EventDetails } from '../../models/event-details';
import { UserAuthService } from '../../core/user-auth.service';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss']
})
export class AddTicketComponent implements OnInit {


  public setps: boolean[];
  public eventKey: string;
  public eventDetail: EventDetails;

  public payment: FormGroup;
  public visitors: FormArray;
  public completedPayment: boolean;
  public selectedPackage: Package;

  public errorsBuyTicket: EventoError;


  constructor(public userAuthService: UserAuthService,
    public sellerService: SellerService,
    public activatedRout: ActivatedRoute,
    public formBuilder: FormBuilder,
    public router: Router) {

    this.completedPayment = false;

    let profile = this.userAuthService.getUserProfile();
    this.eventKey = profile.data.event_key;


    this.getEventDetail();

    this.setps = [true, false, false];
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
        'payment_type': ['', Validators.compose([Validators.required])],
        'maleCount': [''],
        'femaleCount': [''],
        'childCount': [''],
        'dateOfBirthGregorian': ['', Validators.compose([Validators.required])],
        'audienceGender': ['', Validators.compose([Validators.required])],
      });
  }


  public getEventDetail() {
    this.sellerService.viewEventDetails(this.eventKey).subscribe(
      res => {
        this.eventDetail = res;

        //to check if the payment is opned or not
        if (this.eventDetail.data.details.ticket_payment != 1) {
          this.router.navigate(['../tickets'], { relativeTo: this.activatedRout });       
        }
      }
    )
  }

  


  public getSelectedPackage(event: any) {
    this.selectedPackage = event;
  }


  public changeStepForward(event: any) {
    if (this.setps[0] == true) {
      this.setps = [false, true, false];
    }
    else if (this.setps[1] == true) {
      this.setps = [false, false, true];
    }
    else if (this.setps[2] == true) {
      this.setps = [false, false, false];
    }
  }

  public changeStepBackward(event: any) {
    if (this.setps[0] == true) {
      this.router.navigate(['../tickets'], { relativeTo: this.activatedRout });    
    }
    else if (this.setps[1] == true) {
      this.setps = [true, false, false];
    }
    else if (this.setps[2] == true) {
      this.setps = [false, true, false];
    }

  }

  public buyTicket() {
    this.errorsBuyTicket = null;

    this.sellerService.addVistor(this.payment.value, this.eventDetail.data.details.event_key).subscribe(
      res => {
        // this is for free ticket to show success payment
          this.completedPayment = true;        

      }, err => {
        this.errorsBuyTicket = err.value.error;
      })
  }

  public onDashboard(){
    this.router.navigate(['../tickets'], { relativeTo: this.activatedRout });    
    
  }

}
