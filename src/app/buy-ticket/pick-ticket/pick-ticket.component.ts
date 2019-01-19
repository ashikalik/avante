import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Observable } from "rxjs";
import { EventDetails, Package } from "../../models/event-details";
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BuyTicketService } from '../../api-services/buy-ticket.service';
import {IMyDpOptions} from 'mydatepicker';

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

    public myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'yyyy-mm-dd',
        editableDateField: false,
        firstDayOfWeek: 'su',       //to set the first day of the week
        sunHighlight: false,        //to unhighlight sundays
        alignSelectorRight: true,    //to align the arrow to the right
        openSelectorOnInputClick: true,  //open the datepicker once the input is selected
        disableSince: {year: 2019, month: 1, day: 25},
        disableUntil:{year: 2019, month: 1, day: 22},
    };


    public isSoldOut: boolean = true;
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
        this.package = this.eventDetail.data.packages.find(x => x.package_id == event);
        this.selectedPackage.emit(this.package);
        this.validatePackage(null, this.package.package_id);
        this.isDateRequired = this.buyTicketService.isDateRequired(this.package);
        this.calcuateTotal();

    }

    onChangeDate(event) {
        this.payment.get('access_date').setValue(event.formatted);
        
    }


    onChangeNumOfTickets(event) {
        this.numbOfTickets = event;
        this.calcuateTotal();
        this.payment.setControl('visitors', new FormArray([]));
        for (let i = 0; i < this.numbOfTickets; i++) {
            this.visitors = this.payment.get('visitors') as FormArray;
            this.visitors.push(this.createVisitor());
        }
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
        console.log(this.total)
    }


    public validatePackage(access_date: any, selectedPackage: any) {
        const body = {
            event_key: this.eventDetail.data.details.event_key,
            package_id: selectedPackage,
            access_date: "2019-12-16"
        }
        this.buyTicketService.validatePackage(body).subscribe(res => {
            this.validatePackageRes = res.data;
            if (this.validatePackageRes.left >= 1) {
                this.isSoldOut = false;
            }
        })
    }

    onButtonNext() {
        console.log(this.payment)
        this.onNext.emit();
    }

    onButtonBack() {
        console.log(this.payment)
        this.onBack.emit();
    }


    // public onSelectPackage(event) {
    //     this.invoiceVM.resetValidatePackage()
    //     this.hideSelectTickets = true;

    //     // when nothing has been selected set the package_id to null
    //     if (event.target.value == null) {
    //         this.payment.get('package_id').setValue(null);
    //         this.access_date_required = false;
    //         this.payment.get('access_date').setValue(null);

    //     }


    //     this.selectedPackage = this.listPackages.find(x => x.package_id == event.target.value);
    //     console.log(this.selectedPackage);
    //     if (this.selectedPackage && this.selectedPackage.specific_tickets) {
    //         if (this.selectedPackage.specific_tickets == 1) {
    //             this.access_date_required = true;
    //             this.payment.get('access_date').setValidators([Validators.required]);
    //             this.hideSelectTickets = true;
    //         } else {
    //             this.access_date_required = false;
    //             this.payment.get('access_date').clearValidators();
    //             this.payment.get('access_date').setValue(null);
    //         }

    //         if (this.selectedPackage.price > 0) {
    //             this.isFreePackage = false;
    //         } else {
    //             this.isFreePackage = true;
    //         }
    //     } else {
    //         this.isFreePackage = true;
    //         this.validatePackage('');
    //     }
    //     this.payment.updateValueAndValidity();
    // }

}
