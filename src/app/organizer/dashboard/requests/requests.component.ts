import { Component, OnInit } from '@angular/core';
import { RequstStatus } from '../../../models/request-status';
import { RequestsService } from '../../../api-services/requests.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { Requests } from '../../../models/requests';
import { RequestDetials } from '../../../models/request-details';
import { DatePickerInputPipe } from 'src/app/shared/date-picker-input.pipe';
import { ConvertFrom24To12FormatPipe } from 'src/app/shared/convert-from24-to12-format.pipe';
import { AmPmTimePipe } from 'src/app/shared/am-pm-time.pipe';


@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  public event_key: string;
  public request_status = RequstStatus;
  public requestList: Requests;
  public requestDetails: RequestDetials;

  public preAcceptForm: FormGroup;
  public preAcceptList: any[] = [];
  public numOfRequests: number;
  public onPreAcceptScreen: boolean;
  public isMoreThanOneRequest: boolean;

  public limit: number;
  public page: number;
  public meta: any;
  //for search requests
  public status: any;
  public searchInput: any;

  public lat: any;
  public lng: any;

  constructor(private requestsService: RequestsService,
    private formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute) {

    this.status = '';
    this.searchInput = null;

    this.onPreAcceptScreen = false;
    this.isMoreThanOneRequest = false;
    this.limit = 20;
    this.page = 1;

    //riyadh
    this.lat = 24.7136;
    this.lng = 46.6753;

    this.activatedRoute.parent.params.subscribe(params => {
      this.event_key = params['event-key']
    });

    this.getRequests();
  }


  ngOnInit() {
    this.initForm();
  }


  public initForm() {
    this.preAcceptForm = this.formBuilder.group(
      {
        'from_date': [null, Validators.compose([Validators.required])],
        'end_date': [null, Validators.compose([Validators.required])],
        'from_time': [null, Validators.compose([Validators.required, Validators.pattern('(0[0-9]|1[0-2]):[0-5][0-9]$')])],
        'from_time_type': [null, Validators.compose([Validators.required])],
        'end_time': [null, Validators.compose([Validators.required, Validators.pattern('(0[0-9]|1[0-2]):[0-5][0-9]$')])],
        'end_time_type': [null, Validators.compose([Validators.required])],
        'lat': [this.lat, Validators.compose([])],
        'lng': [this.lng, Validators.compose([])],
        'contact': [null, Validators.compose([Validators.pattern('^(05)([0-9]{8})$')])]
      }, {
        //validator: [this.checkTime, this.checkDate]

      });
  }



  public getRequests() {
    this.requestList = null;
    this.requestsService.getRequests(this.event_key, this.limit, this.page, this.status, this.searchInput).subscribe(
      res => {
        this.requestList = res;
      }, err => {

      });
  }


  public onPreAcceptRequest(event) {
    console.log(event)
    this.onPreAcceptScreen = !this.onPreAcceptScreen;

    //To be able to use this method for closing screen
    if (event) {
      //to check if it is only one request or more than one request
      if (event.length && event.length > 0) {
        this.isMoreThanOneRequest = true;
        this.getPreAcceptRequestList();
      }
      else {
        this.preAcceptList = [];
        this.preAcceptList.push(event);
      }
    }
  }

  public preAcceptRequest(form: any, reques_id) {
    this.requestsService.preAccept(form.value, this.preAcceptList, this.event_key).subscribe(
      res => {
        this.getRequests();
      }, err => {

      }
    );
  }

  public getPreAcceptRequestList() {
    this.preAcceptList = [];
    this.numOfRequests = 0;

    this.requestList.data.forEach(value => {
      if (value.joining_status == 1) {
        this.numOfRequests++;
        this.preAcceptList.push(value.request_id);
      }
    });
  }



  public placeMarker(event: any) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
  }

}
