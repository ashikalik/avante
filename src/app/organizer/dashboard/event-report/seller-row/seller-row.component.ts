import {Component, Input, OnInit} from '@angular/core';
import {SellerReport} from "../../../../models/report";
import {OrganizerService} from "../../../../api-services/organizer.service";
import {FormBuilder} from "@angular/forms";
import {CommonService} from "../../../../api-services/common.service";
import {ActivatedRoute} from "@angular/router";
import {SellerInvoiceReport} from "../../../../models/seller-invoice-report";

@Component({
    selector: 'app-seller-row',
    templateUrl: './seller-row.component.html',
    styleUrls: ['./seller-row.component.scss']
})
export class SellerRowComponent implements OnInit {
    @Input() seller: SellerReport;

    public showDetails: boolean;
    public event_key: string;


    constructor(public formBuilder: FormBuilder,
                public commonService: CommonService,
                public activatedRoute: ActivatedRoute) {
        this.activatedRoute.parent.params.subscribe(params => {
            this.event_key = params['event-key']
        })

        this.showDetails = false;
    }

    ngOnInit() {
    }

    public onShowDetails() {
        this.showDetails = !this.showDetails;
    }


}
