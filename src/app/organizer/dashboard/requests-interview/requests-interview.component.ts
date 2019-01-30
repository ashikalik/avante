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

  public selectRate:number;
  
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
        res.data.question.forEach(value => {
          value.selectedRate = null; 
      });
      console.log(this.requestDetails);
      
      }, err => {

      });
  }


  public rateQuestion(question_id: number, rating: number) {

    console.log(question_id    +   "   " + rating )
    this.requestsService.rateQuestion(question_id, rating,this.request_id, this.event_key).subscribe(
        res => {
            this.getRequestDetialsForInterview();
        }, err => {

        }
    );
}



public onSelectRate(questionNum: any, selectedRate: number) {
  console.log(questionNum);
  console.log(selectedRate)
  this.requestDetails.data.question[questionNum].selectedRate = selectedRate;
}

}
