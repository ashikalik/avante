import {Component, OnInit} from '@angular/core';
import {Event} from "../../../models/event-organizer";
import {OrganizerService} from "../../../api-services/organizer.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../../../api-services/common.service";
import {ActivatedRoute} from "@angular/router";
import {EventoError} from "../../../models/error";

@Component({
    selector: 'app-link-with-gea',
    templateUrl: './link-with-gea.component.html',
    styleUrls: ['./link-with-gea.component.scss']
})
export class LinkWithGeaComponent implements OnInit {
    public event_key: string;
    public eventDetails: Event;
    public showLink: boolean;
    public form: FormGroup;
    public errorMOI: EventoError;


    constructor(public organizerService: OrganizerService,
                public formBuilder: FormBuilder,
                public commonService: CommonService,
                public activatedRoute: ActivatedRoute) {
        this.activatedRoute.parent.params.subscribe(params => {
            this.event_key = params['event-key']
        })

        this.showLink = false
    }

    ngOnInit() {
        this.initForm();
        this.getEventDetails();
    }

    public getEventDetails() {

        this.organizerService.getEvent(1, 1, null, this.event_key, null).subscribe(res => {
            this.eventDetails = res.data[0];
            if(!this.eventDetails.moi_number)
                this.showLink = true;
            else
                this.showLink = false;

        }, err => {

        });
    }

    initForm() {
        this.form = this.formBuilder.group(
            {
                'crNumber': ['', Validators.compose([Validators.required, Validators.pattern('^\\d+$'), Validators.minLength(10), Validators.maxLength(10)])],
            });
    }


    public linkGEA(form: FormGroup) {

        const body = form.value

        this.organizerService.updateMOINumber(body , this.event_key) .subscribe(
            res => {
                this.getEventDetails()
            }, err => {
                this.errorMOI = err.value.error;
            }
        );

    }


}
