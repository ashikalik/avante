import { Component, OnInit } from '@angular/core';
import {Supervisors} from "../../../models/supervisors";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EventoError} from "../../../models/error";
import {OrganizerService} from "../../../api-services/organizer.service";
import {CommonService} from "../../../api-services/common.service";
import {ActivatedRoute} from "@angular/router";
import {Sales} from "../../../models/sales";

@Component({
  selector: 'app-event-sales',
  templateUrl: './event-sales.component.html',
  styleUrls: ['./event-sales.component.scss']
})
export class EventSalesComponent implements OnInit {

    public event_key: string;
    public sales: Sales;
    public showCreate: boolean;
    public form: FormGroup;
    public errorCreate: EventoError;
    public page: number;

    public search: string;
    public status_id: string;




    constructor(public organizerService: OrganizerService,
                public formBuilder: FormBuilder,
                public commonService: CommonService,
                public activatedRoute: ActivatedRoute) {


        this.activatedRoute.parent.params.subscribe(params => {
            this.event_key = params['event-key']
        })

        this.showCreate = false;

    }

    ngOnInit() {
        this.page = 1;
        this.status_id = "";
        this.getEventSales();
    }

    public getEventSales() {
        this.organizerService.getEventSales(this.page, this.search, this.status_id, this.event_key).subscribe(
            res => {
                this.sales = res;
            }, err => {

            }
        );
    }

    public onShowCreate() {
        this.errorCreate = null;
        if(!this.showCreate)
            this.initAddForm()
        this.showCreate = !this.showCreate;
    }

    public initAddForm() {
        this.form = this.formBuilder.group(
            {
                'first_name': ['', Validators.compose([ Validators.required,  Validators.minLength(3), Validators.maxLength(40)])],
                'last_name': ['', Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(40)])],
                'mobile': ['', Validators.compose([  Validators.required,Validators.pattern('^(05)([0-9]{8})$')])],
                'gender': ['', Validators.compose([Validators.required])],
                'mail': ['', Validators.compose([Validators.required, Validators.email])]
            });

    }

    public addSalesStaff(form: FormGroup) {
        this.errorCreate = null;
        this.organizerService.createEventSales(form.value, this.event_key).subscribe(
            res => {
                this.getEventSales();
                this.onShowCreate();
            }, err => {
                this.errorCreate = err.value.error;
            }
        );
    }

    goToPage(n: number): void {
        this.page = n;
        this.getEventSales();
    }

    onNext(): void {
        this.page++;
        this.getEventSales();
    }

    onPrev(): void {
        this.page--;
        this.getEventSales();
    }

    public searchSales() {
        this.page = 1;
        this.getEventSales();

    }
}
