import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../../../api-services/requests.service';
import { RequestDetials } from '../../../models/request-details';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-requests-interview',
  templateUrl: './requests-interview.component.html',
  styleUrls: ['./requests-interview.component.scss']
})
export class RequestsInterviewComponent implements OnInit {

  public requestDetails: RequestDetials;
  public event_key: string;
  public request_id: number;
  
  constructor(private requestsService: RequestsService,
    public activatedRoute: ActivatedRoute) {

    this.activatedRoute.parent.params.subscribe(params => {
      this.event_key = params['event-key']
    });
    this.activatedRoute.params.subscribe(params => {
      this.request_id = params['request-id']
    });
   }

  ngOnInit() {
    this.getRequestDetialsForInterview();
    
  }



  public getRequestDetialsForInterview() {
    this.requestDetails = null;
    this.requestsService.getRequestDetialsForInterview(this.request_id, this.event_key).subscribe(
      res => {
        this.requestDetails = res;
      }, err => {

      });
  }


  public rateQuestion(form: any, rating: any) {
    this.requestsService.rateQuestion(form, this.event_key).subscribe(
        res => {
            this.getRequestDetialsForInterview();
        }, err => {

        }
    );
}

}
