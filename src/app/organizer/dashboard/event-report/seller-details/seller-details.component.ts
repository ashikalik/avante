import {Component, Input, OnInit} from '@angular/core';
import {OrganizerService} from "../../../../api-services/organizer.service";
import {FormBuilder} from "@angular/forms";
import {CommonService} from "../../../../api-services/common.service";
import {ActivatedRoute} from "@angular/router";
import {SellerInvoiceReport} from "../../../../models/seller-invoice-report";

@Component({
    selector: 'app-seller-details',
    templateUrl: './seller-details.component.html',
    styleUrls: ['./seller-details.component.scss']
})
export class SellerDetailsComponent implements OnInit {
    public event_key: string;
    @Input() seller_id: number;
    public sellerInvoicesReport: SellerInvoiceReport;


    constructor(public organizerService: OrganizerService,
                public formBuilder: FormBuilder,
                public commonService: CommonService,
                public activatedRoute: ActivatedRoute) {
        this.activatedRoute.parent.params.subscribe(params => {
            this.event_key = params['event-key']
        })

    }

    ngOnInit() {
        this.getSellerSales();
    }

    public getSellerSales() {
        this.organizerService.getSellerInvoices(this.seller_id, this.event_key).subscribe(
            res => {
                this.sellerInvoicesReport = res;
            }, err => {

            }
        );

    }

}
