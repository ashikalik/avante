import {Component, OnInit} from '@angular/core';
import {OrganizerService} from "../../../api-services/organizer.service";
import {FormBuilder} from "@angular/forms";
import {CommonService} from "../../../api-services/common.service";
import {ActivatedRoute} from "@angular/router";
import {Report} from "../../../models/report";

@Component({
    selector: 'app-event-report',
    templateUrl: './event-report.component.html',
    styleUrls: ['./event-report.component.scss']
})
export class EventReportComponent implements OnInit {
    public event_key: string;
    public report: Report;


    constructor(public organizerService: OrganizerService,
                public formBuilder: FormBuilder,
                public commonService: CommonService,
                public activatedRoute: ActivatedRoute) {
        this.activatedRoute.parent.params.subscribe(params => {
            this.event_key = params['event-key']
        })

    }

    ngOnInit() {
        this.getEventReport();
    }

    public getEventReport() {
        this.organizerService.getEventReport(this.event_key).subscribe(
            res => {
                this.report = res;
            }, err => {

            }
        );
    }

}
