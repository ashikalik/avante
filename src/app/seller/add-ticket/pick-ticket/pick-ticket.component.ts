import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Observable } from "rxjs";
import { EventDetails, Package } from "../../../models/event-details";
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BuyTicketService } from '../../../api-services/buy-ticket.service';
import { MyDatePickerOptions } from '../../../models/date-picker-object';
import { DisableDateUntilPipe } from '../../../shared/disable-date-until.pipe';
import { DisableDateSincePipe } from '../../../shared/disable-date-since.pipe';
import { EventoError } from '../../../models/error';

@Component({
    selector: 'app-pick-ticket',
    templateUrl: './pick-ticket.component.html',
    styleUrls: ['./pick-ticket.component.scss']
})
export class PickTicketComponent implements OnInit {

    @Input() eventDetail: EventDetails;
    @Input() payment: FormGroup;
    @Output() onNext: EventEmitter<any> = new EventEmitter();
    @Output() onBack: EventEmitter<any> = new EventEmitter();
    @Output() selectedPackage: EventEmitter<any> = new EventEmitter();

    public visitors: FormArray;
    public errorsValidatePackage: EventoError;    

    public myDatePickerOptions = MyDatePickerOptions;

    public isSoldOut: boolean = false;
    public isLessThanFive:boolean = false;
    public isDateRequired: boolean;
    public package: Package;
    public validatePackageRes: any;
    public total: number;
    public numbOfTickets: number;

    constructor(private buyTicketService: BuyTicketService,
        public formBuilder: FormBuilder) {

    }

    ngOnInit() {

    }



    onChangePackage(event) {
        this.payment.get('maleCount').setValue(''); 
        this.payment.get('femaleCount').setValue(''); 
        this.payment.get('childCount').setValue(''); 
        this.payment.get('num_ticket').setValue(''); 
        this.payment.get('access_date').setValue(null);
        
        this.package = this.eventDetail.data.packages.find(x => x.package_id == event);

        this.myDatePickerOptions.disableUntil = new DisableDateUntilPipe().transform(this.eventDetail.data.details.from_date);
        this.myDatePickerOptions.disableSince = new DisableDateSincePipe().transform(this.eventDetail.data.details.end_date);


        this.isDateRequired = this.buyTicketService.isDateRequired(this.package);


        if(this.isDateRequired){
            this.payment.get('access_date').setValidators([Validators.required]);                        
        }else{
            this.payment.get('access_date').clearValidators();
            this.payment.get('access_date').setValue(null);
            this.validatePackage(null, this.package.package_id);            
            
        }
        
        // this.calcuateTotal();

        //emitter for the root component
        this.selectedPackage.emit(this.package);

    }

    onChangeDate(event) {
        this.payment.get('access_date').setValue(event.formatted);
        this.validatePackage(event.formatted, this.package.package_id)
    }



    onChangeNumOfTickets(event) {
        this.numbOfTickets = Number(this.payment.get('maleCount').value) + Number(this.payment.get('femaleCount').value) + Number(this.payment.get('childCount').value);
        this.payment.get('num_ticket').setValue(this.numbOfTickets);
        this.calcuateTotal();
        // this.numbOfTickets = Number(this.payment.get('maleCount').value) + Number(this.payment.get('femaleCount').value) + Number(this.payment.get('childCount').value);
        // this.payment.get('num_ticket').setValue(this.numbOfTickets);
        // this.calcuateTotal();
        // this.payment.setControl('visitors', new FormArray([]));
        // for (let i = 0; i < this.numbOfTickets; i++) {
        //     this.visitors = this.payment.get('visitors') as FormArray;
        //     this.visitors.push(this.createVisitor());
        // }
    }


    public createVisitor() {
        return this.formBuilder.group({
            first_name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(40)])],
            last_name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(40)])]
        });
    }

    calcuateTotal() {
        this.numbOfTickets = this.payment.get('num_ticket').value;
        this.total = this.numbOfTickets * this.package.price;
        console.log(this.numbOfTickets)
        console.log(this.total)
    }


    public validatePackage(access_date: any, selectedPackage: any) {
        //to rest this value once this value is changed
        this.validatePackageRes = null;
        this.errorsValidatePackage = null;
        this.isLessThanFive = false;
        this.isSoldOut = false;


        const body = {
            event_key: this.eventDetail.data.details.event_key,
            package_id: selectedPackage,
            access_date: access_date
        }
        this.buyTicketService.validatePackage(body).subscribe(res => {
            this.validatePackageRes = res.data;
            if (this.validatePackageRes.left == 0) {
                this.isSoldOut = true;
            }
            if (this.validatePackageRes.left <= 5 && this.validatePackageRes.left >= 1) {
                this.isLessThanFive = true;
            }
        }, err => {
            this.errorsValidatePackage = err.value.error;
        })
    }

    onButtonNext() {
        this.onNext.emit();
    }

    onButtonBack() {
        this.onBack.emit();
    }

}
