import {Component, OnInit} from '@angular/core';
import {OrganizerService} from "../../../api-services/organizer.service";
import {FormBuilder} from "@angular/forms";
import {CommonService} from "../../../api-services/common.service";
import {ActivatedRoute} from "@angular/router";
import {Report} from "../../../models/report";

@Component({
  selector: 'app-event-report-daily',
  templateUrl: './event-report-daily.component.html',
  styleUrls: ['./event-report-daily.component.scss']
})
export class EventReportDailyComponent implements OnInit {
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
        this.organizerService.getDailyEventReport(this.event_key).subscribe(
            res => {
                this.report = res;
            }, err => {

            }
        );
    }

}
