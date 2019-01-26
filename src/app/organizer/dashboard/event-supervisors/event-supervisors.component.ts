import {Component, OnInit} from '@angular/core';
import {OrganizerService} from "../../../api-services/organizer.service";
import {FormBuilder} from "@angular/forms";
import {CommonService} from "../../../api-services/common.service";
import {ActivatedRoute} from "@angular/router";
import {Supervisors} from "../../../models/supervisors";

@Component({
    selector: 'app-event-supervisors',
    templateUrl: './event-supervisors.component.html',
    styleUrls: ['./event-supervisors.component.scss']
})
export class EventSupervisorsComponent implements OnInit {
    public event_key: string;
    public supervisors: Supervisors;
    public showCreate: boolean;


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
        this.showCreate = !this.showCreate;
    }

}
