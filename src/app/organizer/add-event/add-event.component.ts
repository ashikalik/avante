import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ValidatorService} from "../../shared/validator.service";
import {CommonService} from "../../api-services/common.service";
import {City, cityObj} from "../../models/city";
import {EventType} from "../../models/event-type";
import {Audiences} from "../../models/audience";
import {MyDatePickerOptions} from '../../models/date-picker-object';
import {EventService} from '../../api-services/event.service';
import {Router, ActivatedRoute} from '@angular/router';

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
    public error: Error;

    public myDatePickerOptions = MyDatePickerOptions;
    public updatedCityList: cityObj[];


    constructor(public formBuilder: FormBuilder,
                public commonService: CommonService,
                public eventService: EventService,
                public router: Router,
                private route: ActivatedRoute,
                public validatorService: ValidatorService) {

        this.hidePricesScree = false;

        //riyadh
        this.lat = 24.7136;
        this.lng = 46.6753;

    }

    ngOnInit() {
        this.loadCityList();
        this.loadEventTypeList();
        this.loadRegionList();
        this.loadAudicanceList();
        this.initForm();
        $('.event-image').on('click', function () {
            $(this).parent().prev().click()
        });

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
                'from_date': [null, Validators.compose([Validators.required])],
                'end_date': [null, Validators.compose([Validators.required])],
                'from_time': ['', Validators.compose([Validators.required, Validators.pattern('(0[0-9]|1[0-2]):[0-5][0-9]$')])],
                'from_time_type': ['', Validators.compose([Validators.required])],
                'end_time': ['', Validators.compose([Validators.required, Validators.pattern('(0[0-9]|1[0-2]):[0-5][0-9]$')])],
                'end_time_type': ['', Validators.compose([Validators.required])],
                'type_id': ['', Validators.compose([Validators.required])],
                'lat': [this.lat, Validators.compose([])],
                'lng': [this.lng, Validators.compose([])],
                'address': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(1000)])],
                'recaptcha': [null, Validators.compose([Validators.required])],
                'agreementChecked': [false, Validators.pattern('true')],
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


    public placeMarker(event: any) {
        this.lat = event.coords.lat;
        this.lng = event.coords.lng;
    }


    public onChangeRegion(event) {
        this.updatedCityList = this.cityList.data.filter((item) => item.region_id == event);
        this.form.get('city_id').setValue('');

    }

    public fileEvent(ev: any) {
        const fl: FileList = ev.target.files;
        if (fl.length > 0) {

            const file: File = fl[0];

            const myReader: FileReader = new FileReader();


            myReader.onloadend = (e) => {
                this.imageURL = myReader.result;
                console.log(this.imageURL)
            };

            myReader.readAsDataURL(file);
        } else {
            this.imageURL = null;
        }

    }

    public addEvent(form: any) {

        this.error = null;

        this.eventService.addEvent(form.value, this.imageURL).subscribe(
            res => {
                this.onCancel();
            },
            err => {
                this.error = err.value.error;
            }
        );
    }


    public onCancel() {
        this.router.navigate(['../my-events'], {relativeTo: this.route});

    }


}
