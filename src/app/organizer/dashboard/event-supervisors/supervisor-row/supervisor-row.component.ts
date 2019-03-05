import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Supervisor} from "../../../../models/supervisors";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrganizerService} from "../../../../api-services/organizer.service";
import {CommonService} from "../../../../api-services/common.service";
import {ActivatedRoute} from "@angular/router";
import {MobilePipe} from "../../../../shared/mobile.pipe";

@Component({
    selector: 'app-supervisor-row',
    templateUrl: './supervisor-row.component.html',
    styleUrls: ['./supervisor-row.component.scss']
})
export class SupervisorRowComponent implements OnInit {

    @Input() supervisor: Supervisor;
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

    public onUpdateSupervisor() {
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
                'first_name': [this.supervisor.first_name, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(40)])],
                'last_name': [this.supervisor.last_name, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(40)])],
                'mobile': [new MobilePipe().transform(this.supervisor.mobile), Validators.compose([Validators.required, Validators.pattern('^(05)([0-9]{8})$')])],
                'gender': [this.supervisor.gender, Validators.compose([Validators.required])],
                'requests': [this.supervisor.requests, Validators.compose([Validators.required])],
                'sellers': [this.supervisor.sellers, Validators.compose([Validators.required])],
                'mail': [this.supervisor.mail, Validators.compose([Validators.required, Validators.email])],
                'status_id': [this.supervisor.status_id, Validators.compose([Validators.required])]
            });

    }


    public updateSupervisor(form: FormGroup) {

        this.organizerService.updateEventSupervisor(form.value, this.supervisor.user_id, this.event_key).subscribe(
            res => {
                this.onUpdate.emit();
                this.onShowDetails();
            }, err => {

            }
        );

    }

    public deleteSupervisor() {
        this.organizerService.deleteEventSupervisor(this.supervisor.user_id, this.event_key).subscribe(
            res => {
                this.onUpdate.emit();
                this.onShowDetails();
            }, err => {

            }
        );

    }




}
