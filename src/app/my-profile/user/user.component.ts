import {Component, Input, OnInit} from '@angular/core';
import {UpdateInformation, UpdatePassword, UserProfile} from "../../models/user-profile";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MobilePipe} from "../../shared/mobile.pipe";
import {ProfileService} from "../../api-services/profile.service";
import {UserAuthService} from "../../core/user-auth.service";
import {EventoError} from "../../models/error";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {


    @Input() userProfile: UserProfile;

    public infoForm: FormGroup;
    public passwordForm: FormGroup;

    public errorInfo: EventoError;
    public errorPassword: EventoError;

    public successInfo: boolean;
    public successPassword: boolean;

    constructor(public formBuilder: FormBuilder,
                public profileService: ProfileService,
                public userAuthService: UserAuthService) {
    }

    ngOnInit() {
        this.initInfoForm();
        this.initPasswordForm();

    }


    public initInfoForm() {
        this.infoForm = this.formBuilder.group(
            {
                'first_name': [this.userProfile.data.first_name, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(40)])],
                'last_name': [this.userProfile.data.last_name, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(40)])],
                'email': [{
                    value: this.userProfile.data.email,
                    disabled: true
                }, Validators.compose([Validators.required, Validators.email, Validators.minLength(3)])],
                'mobile': [new MobilePipe().transform(this.userProfile.data.mobile) , Validators.compose([Validators.required, Validators.pattern('^(05)[0-9]{8}$')])],
            });
    }

    public initPasswordForm() {
        this.passwordForm = this.formBuilder.group(
            {
                'current_password': ['', Validators.compose([Validators.required])],
                'new_password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
                'confirm_password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            },{
                validator: this.passwordConfirm
            });
    }

    public passwordConfirm(AC: AbstractControl): { invalid: boolean } {
        if (AC.get('new_password').value !== AC.get('confirm_password').value) {
            return { invalid: true };
        }
    }


    public updateInfo(form: FormGroup) {
        let body: UpdateInformation = form.value;
        this.errorInfo = null;
        this.successInfo = false
        this.profileService.updateInfo(body, this.userProfile.data.user_id).subscribe(res => {
            this.userAuthService.setToken(res.token);
            this.successInfo = true;

        }, err => {
            this.errorInfo = err.value.error;
        });


    }

    public updatePassword(form: FormGroup) {
        let body: UpdatePassword = form.value;
        this.errorPassword = null;
        this.successPassword = false;
        this.profileService.updatePassword(body, this.userProfile.data.user_id).subscribe(res => {
            this.userAuthService.setToken(res.token);
            this.successPassword = true;
        }, err => {
            this.errorPassword = err.value.error;
        });
    }

}
