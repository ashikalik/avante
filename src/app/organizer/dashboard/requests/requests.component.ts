import {Component, OnInit} from '@angular/core';
import {RequstStatus} from '../../../models/request-status';
import {RequestsService} from '../../../api-services/requests.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Requests} from '../../../models/requests';
import {RequestDetials} from '../../../models/request-details';
import {MyDatePickerOptions} from '../../../models/date-picker-object'
import {ValidatorService} from '../../../shared/validator.service';
import {EventoError} from '../../../models/error';

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
    public myDatePickerOptions = MyDatePickerOptions;

    public preAcceptForm: FormGroup;
    public preAcceptList: any[] = [];
    public numOfRequests: number;
    public onPreAcceptScreen: boolean;
    public isMoreThanOneRequest: boolean;

    public displayMap: boolean;

    public limit: number;
    public page: number;
    public meta: any;
    //for search requests
    public status: any;
    public searchInput: any;
    public error: EventoError;
    public errorPreAccept: EventoError;

    public lat: any;
    public lng: any;

    constructor(private requestsService: RequestsService,
                private formBuilder: FormBuilder,
                public validatorService: ValidatorService,
                public activatedRoute: ActivatedRoute) {

        this.status = '';
        this.searchInput = null;

        this.onPreAcceptScreen = false;
        this.isMoreThanOneRequest = false;
        this.page = 1;

        //riyadh
        this.lat = 24.7136;
        this.lng = 46.6753;
        this.displayMap = false;

        this.activatedRoute.parent.params.subscribe(params => {
            this.event_key = params['event-key']
        });

        this.getRequests();
    }


    ngOnInit() {
        this.error = null;
        this.errorPreAccept = null;
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
                'interview_location': [null, Validators.compose([])],
                'contact': [null, Validators.compose([Validators.pattern('^(05)([0-9]{8})$')])]
            }, {
                validator: [this.validatorService.checkTime, this.validatorService.checkDate]

            });

        this.onChangeLocation();
        this.preAcceptForm.updateValueAndValidity();
        
    }


    public onChangeLocation() {

        this.preAcceptForm.get('interview_location').valueChanges.subscribe(
            res => {

                if (this.preAcceptForm.get('interview_location').value == null || this.preAcceptForm.get('interview_location').value == '') {
                    this.displayMap = false;
                    this.preAcceptForm.get('lat').clearValidators();
                    this.preAcceptForm.get('lng').clearValidators();
                    this.preAcceptForm.controls['lat'].setValue(null);
                    this.preAcceptForm.controls['lng'].setValue(null);
                } else {
                    this.displayMap = true;
                    this.preAcceptForm.get('lat').setValidators([Validators.required]);
                    this.preAcceptForm.get('lng').setValidators([Validators.required]);
                    this.preAcceptForm.controls['lat'].setValue(this.lat);
                    this.preAcceptForm.controls['lng'].setValue(this.lng);
                }
                this.preAcceptForm.updateValueAndValidity();
            });
    }


    public getRequests() {
        this.requestList = null;
        this.error = null;
        this.requestsService.getRequests(this.event_key, this.page, this.status, this.searchInput).subscribe(
            res => {
                this.requestList = res;
            }, err => {
                this.error = err.value.error;
            });
    }


    public onPreAcceptRequest(event) {
        this.onPreAcceptScreen = !this.onPreAcceptScreen;

        //To be able to use this method for closing screen
        if (event) {
            //to check if it is only one request or more than one request
            if (event.length && event.length > 0) {
                this.isMoreThanOneRequest = true;
                this.getPreAcceptRequestList();
            } else {
                this.preAcceptList = [];
                this.preAcceptList.push(event);
            }
        }
    }

    public preAcceptRequest(form: any, reques_id) {
        this.errorPreAccept = null;
        console.log(form.value);
        this.requestsService.preAccept(form.value, this.preAcceptList, this.event_key).subscribe(
            res => {
                this.onPreAcceptRequest(null);
                this.getRequests();
            }, err => {
                this.errorPreAccept = err.value.error;
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


    public onUpdateRequest() {
        this.getRequests();
    }


    public placeMarker(event: any) {
        console.log(event);
        this.lat = event.coords.lat;
        this.lng = event.coords.lng;
        this.preAcceptForm.controls['lat'].setValue(this.lat);
        this.preAcceptForm.controls['lng'].setValue(this.lng);

    }


    goToPage(n: number): void {
        this.page = n;
        this.getRequests();
    }

    onNext(): void {
        this.page++;
        this.getRequests();
    }

    onPrev(): void {
        this.page--;
        this.getRequests();
    }

    public search() {
        this.page = 1;
        this.getRequests();

    }

}
