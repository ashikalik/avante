import { Component, OnInit } from '@angular/core';
import { EventService } from "../../../api-services/event.service";
import { ActivatedRoute, Router } from "@angular/router";
import { OrganizerService } from "../../../api-services/organizer.service";
import { Event } from "../../../models/event-organizer";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { CommonService } from "../../../api-services/common.service";
import { City, cityObj } from "../../../models/city";
import { EventType } from "../../../models/event-type";
import { Audiences } from "../../../models/audience";
import { DatePickerInputPipe } from "../../../shared/date-picker-input.pipe";
import { MyDatePickerOptions } from "../../../models/date-picker-object";
import { ConvertFrom24To12FormatPipe } from "../../../shared/convert-from24-to12-format.pipe";
import { AmPmTimePipe } from "../../../shared/am-pm-time.pipe";
import { EventoError } from "../../../models/error";
import { ValidatorService } from '../../../shared/validator.service';
import { UserAuthService } from '../../../core/user-auth.service';


@Component({
    selector: 'app-event-details',
    templateUrl: './event-details.component.html',
    styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

    public event_key: string;
    public eventDetails: Event;
    public showUpdate: boolean;
    public form: FormGroup;
    public cityList: City;
    public regionList: City;
    public eventTypeList: EventType;
    public audiencesList: Audiences;
    public imageURL: any;
    public updatedCityList: cityObj[];
    public myDatePickerOptions = MyDatePickerOptions;
    public lat: any;
    public lng: any;
    public errorUpdate: EventoError;
    public sucessUpdate: string;
    public isAdmin: boolean;
    public copy: boolean;




    constructor(public organizerService: OrganizerService,
        public formBuilder: FormBuilder,
        private userAuthService: UserAuthService,
        public validatorService: ValidatorService,
        public commonService: CommonService,
        public activatedRoute: ActivatedRoute) {

        this.isAdmin = false;

        this.activatedRoute.parent.params.subscribe(params => {
            this.event_key = params['event-key'];
        })

        const userType = this.userAuthService.getUserProfile();
        if (userType.data.user_type == '2') {
            this.isAdmin = true;
        }

        this.showUpdate = false;
        this.copy = false;

    }

    ngOnInit() {
        this.loadCityList();
        this.loadEventTypeList();
        this.loadRegionList();
        this.loadAudicanceList();
        this.getEventDetails();
        $('.event-image').on('click', function () { $(this).parent().prev().click() });
    }

    public changeEdit() {
        if (!this.showUpdate) {
            this.initForm();
        }
        this.showUpdate = !this.showUpdate
    }

    public getEventDetails() {
        this.organizerService.getEvent(1, 1, null, this.event_key, null).subscribe(res => {
            this.eventDetails = res.data[0];
            // this.changeEdit();
        }, err => {

        });
    }

    public initForm() {

        this.updatedCityList = this.cityList.data.filter((item) => item.region_id == this.eventDetails.region_id);
        this.lat = this.eventDetails.lat;
        this.lng = this.eventDetails.lng;


        this.form = this.formBuilder.group(
            {
                'name': [this.eventDetails.name, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(40)])],
                'city_id': [this.eventDetails.city_id, Validators.compose([Validators.required])],
                'region': [this.eventDetails.region_id, Validators.compose([Validators.required])],
                'audience_gender': [this.eventDetails.audience_id, Validators.compose([Validators.required])],
                'maximum_capacity': [this.eventDetails.maximum_capacity, Validators.compose([Validators.required, Validators.min(1)])],
                'minimum_age': [this.eventDetails.minimum_age, Validators.compose([Validators.required, Validators.min(0)])],
                'details': [this.eventDetails.details, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(1000)])],
                'from_date': [new DatePickerInputPipe().transform(this.eventDetails.from_date), Validators.compose([Validators.required])],
                'end_date': [new DatePickerInputPipe().transform(this.eventDetails.end_date), Validators.compose([Validators.required])],
                'from_time': [new ConvertFrom24To12FormatPipe().transform(this.eventDetails.from_time), Validators.compose([Validators.required, Validators.pattern('(0[0-9]|1[0-2]):[0-5][0-9]$')])],
                'from_time_type': [new AmPmTimePipe().transform(this.eventDetails.from_time), Validators.compose([Validators.required])],
                'end_time': [new ConvertFrom24To12FormatPipe().transform(this.eventDetails.end_time), Validators.compose([Validators.required, Validators.pattern('(0[0-9]|1[0-2]):[0-5][0-9]$')])],
                'end_time_type': [new AmPmTimePipe().transform(this.eventDetails.end_time), Validators.compose([Validators.required])],
                'type_id': [this.eventDetails.type_id, Validators.compose([Validators.required])],
                'lat': [this.eventDetails.lat, Validators.compose([])],
                'lng': [this.eventDetails.lng, Validators.compose([])],
                'address': [this.eventDetails.address, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(1000)])]
            }, {
                validator: [this.validatorService.checkTime, this.validatorService.checkDate]

            });

    }


    public loadCityList() {
        this.commonService.getCity().subscribe(
            res => {
                this.cityList = res;
            }, err => {
            });
    }

    public loadEventTypeList() {
        this.commonService.getEventType().subscribe(
            res => {
                this.eventTypeList = res;
            }, err => {
            });
    }

    public loadRegionList() {
        this.commonService.getRegion().subscribe(
            res => {
                this.regionList = res;
            }, err => {
            });
    }

    public loadAudicanceList() {
        this.commonService.getAudiance().subscribe(
            res => {
                this.audiencesList = res;
            }, err => {
            });
    }

    public updateEvent(form: FormGroup) {

        this.organizerService.updateEventInfo(form.value, this.lat, this.lng, this.imageURL, this.event_key).subscribe(res => {
            this.getEventDetails();
            this.changeEdit();
            this.sucessUpdate = res.meta.message;
        }, err => {
            this.errorUpdate = err.value.error;
        });
    }

    public fileEvent(ev: any) {
        const fl: FileList = ev.target.files;
        if (fl.length > 0) {

            const file: File = fl[0];

            const myReader: FileReader = new FileReader();


            myReader.onloadend = (e) => {
                this.imageURL = myReader.result;

            };

            myReader.readAsDataURL(file);
        } else {
            this.imageURL = null;
        }

    }

    public placeMarker(event: any) {
        this.lat = event.coords.lat;
        this.lng = event.coords.lng;
    }

    public onChangeRegion(event) {
        this.updatedCityList = this.cityList.data.filter((item) => item.region_id == event);
    }

    public copied(event: any) {
        this.copy = true;
        setTimeout(()=>{    
            this.copy = false;
       }, 800);
    }

}
