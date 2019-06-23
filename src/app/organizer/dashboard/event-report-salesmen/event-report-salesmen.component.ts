import {Component, OnInit} from '@angular/core';
import {OrganizerService} from "../../../api-services/organizer.service";
import {FormBuilder} from "@angular/forms";
import {CommonService} from "../../../api-services/common.service";
import {ActivatedRoute} from "@angular/router";
import {Report} from "../../../models/report";

@Component({
  selector: 'app-event-report-salesmen',
  templateUrl: './event-report-salesmen.component.html',
  styleUrls: ['./event-report-salesmen.component.scss']
})
export class EventReportSalesmenComponent implements OnInit {
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
