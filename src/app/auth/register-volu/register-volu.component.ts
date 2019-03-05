import { cityObj } from './../../models/city';
import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {City} from "../../models/city";
import {Meta, Title} from "@angular/platform-browser";
import { Region } from '../../models/region';

@Component({
    selector: 'app-register-volu',
    templateUrl: './register-volu.component.html',
    styleUrls: ['./register-volu.component.sass']
})
export class RegisterVoluComponent implements OnInit {

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



    public onChangeRegion(event) {
        this.updatedCityList = this.cities.data.filter((item) => item.region_id == event);
        this.signupForm.get('city_id').setValue('');
    }



    onCancelButton() {
        this.onCancel.emit();
    }


    onRegisterButton(form: any) {
        const body = {
            first_name: form.value.first_name,
            last_name: form.value.last_name,
            city_id: form.value.city_id,
            email: form.value.email,
            mobile: form.value.mobile,
            password: form.value.password,
            confirm_password: form.value.confirm_password,
            user_type: 1,
            gender: form.value.gender,
            recaptcha: form.value.recaptcha
        };
        this.onRegister.emit(body);
    }


}
