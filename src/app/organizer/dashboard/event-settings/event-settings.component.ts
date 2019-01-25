import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Event} from "../../../models/event-organizer";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EventoError} from "../../../models/error";
import {OrganizerService} from "../../../api-services/organizer.service";

@Component({
    selector: 'app-event-settings',
    templateUrl: './event-settings.component.html',
    styleUrls: ['./event-settings.component.scss']
})
export class EventSettingsComponent implements OnInit {
    public event_key: string;
    public eventDetails: Event;
    public form: FormGroup;
    public errorUpdate: EventoError;



    constructor(public activatedRoute: ActivatedRoute,
                public organizerService: OrganizerService,
                public formBuilder: FormBuilder) {
        this.activatedRoute.parent.params.subscribe(params => {
            this.event_key = params['event-key']
        })

    }

    ngOnInit() {
        this.getEventDetails();

    }

    public getEventDetails() {
        console.log(this.event_key)
        this.organizerService.getEvent(1, 1, null, this.event_key, null).subscribe(res => {
            this.eventDetails = res.data[0];
            this.initForm();
            // this.changeEdit();
        }, err => {

        });
    }

    public initForm() {
        this.form = this.formBuilder.group(
            {
                'joining_status': [this.eventDetails.joining_status, Validators.compose([Validators.required])],
                'ticket_payment': [this.eventDetails.ticket_payment, Validators.compose([Validators.required])],
                'publish_status': [this.eventDetails.publish_status, Validators.compose([Validators.required])],
                'public_status': [this.eventDetails.public_status, Validators.compose([Validators.required])],
            });

    }

    public updateSetting(form: FormGroup) {
        this.organizerService.updateEventSetting(form.value , this.event_key).subscribe(
            res => {
                this.getEventDetails();
            }, err => {
                this.errorUpdate = err.value.error;
            }
        )

    }

}
