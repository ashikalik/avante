import {Component, OnInit} from '@angular/core';
import {ConvertFrom24To12FormatPipe} from "../../shared/convert-from24-to12-format.pipe";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DatePickerInputPipe} from "../../shared/date-picker-input.pipe";
import {AmPmTimePipe} from "../../shared/am-pm-time.pipe";
import {ValidatorService} from "../../shared/validator.service";
import {CommonService} from "../../api-services/common.service";
import {City} from "../../models/city";
import {EventType} from "../../models/event-type";
import {Audiences} from "../../models/audience";

@Component({
    selector: 'app-add-event',
    templateUrl: './add-event.component.html',
    styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

    public hidePricesScree: boolean;
    public form: FormGroup;
    public cityList: City;
    public regionList: City;
    public eventTypeList: EventType;
    public audiencesList: Audiences;
    public imageURL: any;
    public lat: any;
    public lng: any;


    constructor(public formBuilder: FormBuilder,
                public commonService: CommonService,
                public validatorService: ValidatorService) {
        this.hidePricesScree = false;
    }

    ngOnInit() {
        this.loadCityList();
        this.loadEventTypeList();
        this.loadRegionList();
        this.loadAudicanceList();
        this.initForm();
    }


    onAgree() {
        this.hidePricesScree = true;
    }

    public initForm() {


        this.form = this.formBuilder.group(
            {
                'name': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(40)])],
                'city_id': ['', Validators.compose([Validators.required])],
                'region': ['', Validators.compose([Validators.required])],
                'audience_gender': ['', Validators.compose([Validators.required])],
                'maximum_capacity': ['', Validators.compose([Validators.required, Validators.min(1)])],
                'minimum_age': ['', Validators.compose([Validators.required, Validators.min(0)])],
                'details': ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(1000)])],
                'from_date': ['', Validators.compose([Validators.required])],
                'end_date': ['', Validators.compose([Validators.required])],
                'from_time': ['', Validators.compose([Validators.required, Validators.pattern('(0[0-9]|1[0-2]):[0-5][0-9]$')])],
                'from_time_type': ['', Validators.compose([Validators.required])],
                'end_time': ['', Validators.compose([Validators.required, Validators.pattern('(0[0-9]|1[0-2]):[0-5][0-9]$')])],
                'end_time_type': ['', Validators.compose([Validators.required])],
                'type_id': ['', Validators.compose([Validators.required])],
                'lat': ['', Validators.compose([])],
                'lng': ['', Validators.compose([])],
                'address': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(1000)])]
            }, {
                validator: [this.validatorService.checkTime, this.validatorService.checkDate]

            });

        console.log(this.form.value)
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

}
