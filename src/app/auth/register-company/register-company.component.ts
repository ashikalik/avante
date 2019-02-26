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

    public signupForm: FormGroup;
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

        this.initForm();
    }

    public initForm() {
        this.signupForm = this.formBuilder.group(
            {
                'first_name': ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(40)])],
                'last_name': ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(40)])],
                'company_name': ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(40)])],
                'address': ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(40)])],
                'region_id': ['', Validators.compose([Validators.required])],
                'city_id': ['', Validators.compose([Validators.required])],
                'gender': ['', Validators.compose([Validators.required])],
                'email': ['', Validators.compose([Validators.required, Validators.email, Validators.minLength(3)])],
                'confirm_email': ['', Validators.compose([Validators.required, Validators.email, Validators.minLength(3)])],
                'mobile': ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
                'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
                'confirm_password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
                'agreementChecked': [false, Validators.pattern('true')],
                'recaptcha': ['', Validators.compose([Validators.required])],

            },
            {
                validator: [this.passwordConfirm, this.emailConfirm]
            });
    }

    public passwordConfirm(AC: AbstractControl): { invalid: boolean } {
        if (AC.get('password').value !== AC.get('confirm_password').value) {
            return {invalid: true};
        }
    }

    public emailConfirm(AC: AbstractControl): { invalid: boolean } {
        if (AC.get('email').value !== AC.get('confirm_email').value) {
            return {invalid: true};
        }
    }

    onCancelButton() {
        this.onCancel.emit();
    }

    public onChangeRegion(event) {
        this.updatedCityList = this.cities.data.filter((item) => item.region_id == event);
        this.signupForm.get('city_id').setValue('');
    }


    onRegisterButton(form: any) {
        console.log(form.value);
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
