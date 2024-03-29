import { Component, OnInit } from '@angular/core';
import { EventService } from "../../api-services/event.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { EventDetails, Package } from "../../models/event-details";
import { BuyTicketService } from '../../api-services/buy-ticket.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventoError } from '../../models/error';
import { Meta, Title } from "@angular/platform-browser";
import { NetworkConfig } from '../../network-layer/network.config';


declare var Checkout: any;

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
    public visitors: FormArray;
    public completedPayment: boolean;
    public selectedPackage: Package;

    public errorsBuyTicket: EventoError;


    constructor(public eventService: EventService,
        public buyTicketService: BuyTicketService,
        public activatedRout: ActivatedRoute,
        public formBuilder: FormBuilder,
        public router: Router,
        public title: Title,
        public meta: Meta
    ) {

        this.completedPayment = false;
        this.isPaymentOpend = false;

        this.activatedRout.params.subscribe(params => {
            this.eventKey = params['id'];
        });

        this.getEventDetail();

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
                'maleCount': [null],
                'femaleCount': [null],
                'childCount': [null],
                'dateOfBirthGregorian': ['', Validators.compose([Validators.required])],
                'audienceGender': ['', Validators.compose([Validators.required])],
                'visitors': this.formBuilder.array([]),
                'access_date': [null],
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
                this.title.setTitle(this.eventDetail.data.details.name);
                this.meta.addTag({ name: "description", content: this.eventDetail.data.details.details })


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


    public getSelectedPackage(event: any) {
        this.selectedPackage = event;
    }

    public changeStepForward(event: any) {
        if (this.setps[0] == true) {
            this.setps = [false, true, false, false];
        } else if (this.setps[1] == true) {
            this.setps = [false, false, true, false];
        } else if (this.setps[2] == true) {
            this.setps = [false, false, false, true];
        } else if (this.setps[3] == true) {
            this.setps = [false, false, false, false];
        }
    }

    public changeStepBackward(event: any) {
        if (this.setps[0] == true) {
            this.router.navigate(['/event/' + this.eventKey]);
        } else if (this.setps[1] == true) {
            this.setps = [true, false, false, false];
        } else if (this.setps[2] == true) {
            this.setps = [false, true, false, false];
        }

    }

    public buyTicket() {
        this.errorsBuyTicket = null;

        this.buyTicketService.createInvoice(this.payment.value, this.eventDetail.data.details.event_key).subscribe(
            res => {
                // this is for free ticket to show success payment
                if (res.data.price == 0 && res.data.total_with_vat == 0) {
                    this.completedPayment = true;
                    this.router.navigate(['/validate-payment/' + res.data.reference])
                } else {
                    // this.completedPayment = false;
                    // this.changeStepForward(null);
                    Checkout.configure({
                        merchant: NetworkConfig.MERCHANT_ID,
                        order: {
                            amount: res.data.total_with_vat,
                            currency: 'SAR',
                            description: res.data.event_name,
                            id: res.data.reference
                        },
                        session: {
                            id: res.data.session
                        },
                        interaction: {
                            merchant: {
                                name: 'Evento ايفينتو',
                                logo: 'https://i.ibb.co/BGDvmqs/Logo-PNG-1-copy.png'
                            },
                            locale: 'ar_SA',
                            theme: 'default',
                            displayControl: {
                                billingAddress: 'HIDE',
                                customerEmail: 'HIDE',
                                orderSummary: 'HIDE',
                                shipping: 'HIDE'
                            }
                        }
                    });
    
                    Checkout.showPaymentPage()
    
                }




            }, err => {
                this.errorsBuyTicket = err.value.error;
            })
    }

}
