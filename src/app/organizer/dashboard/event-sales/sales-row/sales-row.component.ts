import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Supervisor} from "../../../../models/supervisors";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrganizerService} from "../../../../api-services/organizer.service";
import {CommonService} from "../../../../api-services/common.service";
import {ActivatedRoute} from "@angular/router";
import {MobilePipe} from "../../../../shared/mobile.pipe";
import {Sale} from "../../../../models/sales";

@Component({
  selector: 'app-sales-row',
  templateUrl: './sales-row.component.html',
  styleUrls: ['./sales-row.component.scss']
})
export class SalesRowComponent implements OnInit {

    @Input() sales: Sale;
    @Output() onUpdate: EventEmitter<any> = new EventEmitter();;
    public showDetails: boolean;
    public showUpdate: boolean;
    public showDelete: boolean;
    public form: FormGroup;
    public event_key: string;




    constructor(public organizerService: OrganizerService,
                public formBuilder: FormBuilder,
                public commonService: CommonService,
                public activatedRoute: ActivatedRoute) {
        this.activatedRoute.parent.params.subscribe(params => {
            this.event_key = params['event-key']
        })

        this.showDetails = false;
        this.showUpdate = false;
    }

    ngOnInit() {
    }

    public onShowDetails() {
        this.showDetails = !this.showDetails;
    }

    public onShowDelete() {
        this.showDelete = !this.showDelete;
    }

    public onUpdateSalesStaff() {
        if(!this.showUpdate)
            this.initForm();
        this.showUpdate = !this.showUpdate;
    }

    public close() {
        this.showDetails = false;
        this.showUpdate = false;
    }

    public initForm() {
        this.form = this.formBuilder.group(
            {
                'first_name': [this.sales.first_name, Validators.compose([ Validators.required,  Validators.minLength(3), Validators.maxLength(40)])],
                'last_name': [this.sales.last_name, Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(40)])],
                'mobile': [new MobilePipe().transform(this.sales.mobile), Validators.compose([  Validators.required,Validators.pattern('^(05)([0-9]{8})$')])],
                'gender': [this.sales.gender, Validators.compose([Validators.required])],
                'mail': [this.sales.mail, Validators.compose([Validators.required, Validators.email])],
                'status_id': [this.sales.status_id, Validators.compose([Validators.required])]
            });


    }


    public updateSalesStaff(form: FormGroup) {
        this.organizerService.updateEventSales(form.value, this.sales.user_id, this.event_key).subscribe(
            res => {
                this.onUpdate.emit();
                this.onShowDetails();
            }, err => {

            }
        );

    }

    public deleteSales() {
        this.organizerService.deleteEventSales(this.sales.user_id, this.event_key).subscribe(
            res => {
                this.onUpdate.emit();
                this.onShowDetails();
            }, err => {

            }
        );

    }

}
