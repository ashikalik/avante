import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../../../api-services/requests.service';
import { RequestDetials } from '../../../models/request-details';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoError } from "../../../models/error";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-requests-interview',
  templateUrl: './requests-interview.component.html',
  styleUrls: ['./requests-interview.component.scss']
})
export class RequestsInterviewComponent implements OnInit {

  public requestDetails: RequestDetials;
  public event_key: string;
  public request_id: number;
  public error: EventoError;

  public selectRate: number;
  public interviewForm: FormGroup;
  
  constructor(private requestsService: RequestsService,
    private formBuilder: FormBuilder, 
    public router: Router,   
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
    this.error = null;
    this.requestsService.getRequestDetialsForInterview(this.request_id, this.event_key).subscribe(
      res => {
        this.requestDetails = res;
        this.initForm();
        res.data.question.forEach(value => {
          value.selectedRate = null;
        });
        console.log(this.requestDetails);

      }, err => {
        this.error = err.value.error;

      });
  }


  public rateQuestion(question_id: number, rating: number) {
    this.error = null;
    this.requestsService.rateQuestion(question_id, rating, this.request_id, this.event_key).subscribe(
      res => {
        this.getRequestDetialsForInterview();
      }, err => {
        this.error = err.value.error;

      }
    );
  }

  public initForm() {
    this.interviewForm = this.formBuilder.group(
      {
        'comment': [this.requestDetails.data.request.comment, Validators.compose([Validators.required])],
      });

  }


  public onSelectRate(questionNum: any, selectedRate: number) {
    this.requestDetails.data.question[questionNum].selectedRate = selectedRate;
  }

  public endInterview(interviewForm: FormGroup) {
    this.error = null;    
    this.requestsService.endInterview(interviewForm.value.comment, this.request_id, this.event_key).subscribe(
      res => {
        this.getRequestDetialsForInterview();
        
      }, err => {
        this.error = err.value.error;
        
      }
    );
  }

  public onCancel() {
    this.router.navigate([ '../../evaluations' ], { relativeTo: this.activatedRoute });   
  }


  public rejectRequest(request_id) {
    this.requestsService.reject(request_id, this.event_key).subscribe(
      res => {
        this.getRequestDetialsForInterview();
      }, err => {

      });
  }


  public finalAccept(request_id) {
    this.requestsService.finalAccept(request_id, this.event_key).subscribe(
      res => {
        this.getRequestDetialsForInterview();
      }, err => {

      });
  }

}
