import { cityObj } from './../../models/city';
import { Region } from './../../models/region';
import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {City} from "../../models/city";
import {Meta, Title} from "@angular/platform-browser";


@Component({
    selector: 'app-register-company',
    templateUrl: './register-company.component.html',
    styleUrls: ['./register-company.component.sass']
})
export class RegisterCompanyComponent implements OnInit {

    @Input() cities: City;
    @Input() regions: Region;
    @Output() onCancel: EventEmitter<any> = new EventEmitter();
    @Output() onRegister: EventEmitter<any> = new EventEmitter();
    @Input() signupForm: FormGroup;
    
    public updatedCityList: cityObj[];

    constructor(
        public formBuilder: FormBuilder,
        public title: Title,
        public meta: Meta,
        public router: Router) {
    }

    ngOnInit() {
        this.title.setTitle('التسجيل');
        this.meta.addTag({name: "description", content: 'التسجيل في ايفينتو'})
    }


    onCancelButton() {
        this.onCancel.emit();
    }

    public onChangeRegion(event) {
        this.updatedCityList = this.cities.data.filter((item) => item.region_id == event);
        this.signupForm.get('city_id').setValue('');
    }


    onRegisterButton(form: any) {
        const body = {
            first_name: form.value.first_name,
            last_name: form.value.last_name,
            company_name: form.value.company_name,
            address: form.value.address,
            city_id: form.value.city_id,
            email: form.value.email,
            mobile: form.value.mobile,
            password: form.value.password,
            confirm_password: form.value.confirm_password,
            user_type: 2,
            gender: form.value.gender,
            recaptcha: form.value.recaptcha
        };
        this.onRegister.emit(body);
    }


}
