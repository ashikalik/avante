import {Component, OnInit} from '@angular/core';
import {OrganizerService} from "../../../api-services/organizer.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../../../api-services/common.service";
import {ActivatedRoute} from "@angular/router";
import {Supervisors} from "../../../models/supervisors";
import {EventoError} from "../../../models/error";

@Component({
    selector: 'app-event-supervisors',
    templateUrl: './event-supervisors.component.html',
    styleUrls: ['./event-supervisors.component.scss']
})
export class EventSupervisorsComponent implements OnInit {
    public event_key: string;
    public supervisors: Supervisors;
    public showCreate: boolean;
    public form: FormGroup;
    public errorCreate: EventoError;



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
        this.getEventSupervisor();
    }

    public getEventSupervisor() {
        this.organizerService.getEventSupervisors(this.event_key).subscribe(
            res => {
                this.supervisors = res;
            }, err => {

            }
        );
    }

    public onShowCreate() {
        if(!this.showCreate)
            this.initAddForm()
        this.showCreate = !this.showCreate;
    }

    public initAddForm() {
        this.form = this.formBuilder.group(
            {
                'first_name': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(40)])],
                'last_name': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(40)])],
                'mobile': ['', Validators.compose([Validators.required, Validators.pattern('^(05)([0-9]{8})$')])],
                'gender': ['', Validators.compose([Validators.required])],
                'requests': ['', Validators.compose([Validators.required])],
                'sellers': ['', Validators.compose([Validators.required])],
                'mail': [null, Validators.compose([Validators.required, Validators.email])]
            });

    }

    public addSupervisor(form: FormGroup) {
        this.organizerService.createEventSupervisor(form.value, this.event_key).subscribe(
            res => {
                this.getEventSupervisor();
                this.onShowCreate();
            }, err => {
                this.errorCreate = err.value.error;
            }
        );
    }


}
