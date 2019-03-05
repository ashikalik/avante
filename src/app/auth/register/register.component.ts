import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../api-services/auth.service';
import { CommonService } from "../../api-services/common.service";
import { City } from "../../models/city";
import { Router } from '@angular/router';
import { EventoError } from "../../models/error";
import { Meta, Title } from "@angular/platform-browser";
import { Region } from '../../models/region';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

    showRegForm: boolean;
    isSignupCompleted: boolean = false;
    public signupForm: FormGroup;
    
    showMemberForm: boolean = false;
    showOrganizerForm: boolean = false;
    showCompanyForm: boolean = false;

    organizer: boolean = false;
    member: boolean = false;
    company: boolean = false;


    public cities: City;
    public regions: Region;
    public recaptcha: any;

    public registrationError: EventoError;
    constructor(private authService: AuthService,
        public router: Router,
        public formBuilder: FormBuilder,        
        public title: Title,
        public meta: Meta,
        public commonService: CommonService) {
    }


    ngOnInit() {
        this.title.setTitle('التسجيل');
        this.meta.addTag({ name: "description", content: 'التسجيل في ايفينتو' })
        this.getCity();
        this.getRegion();
        this.onMember();
        this.showRegForm = false;
        this.recaptcha = null;
    }

    getCity() {
        this.commonService.getCity().subscribe(res => {
            this.cities = res
        }, err => {


        })

    }

    getRegion() {
        this.commonService.getRegion().subscribe(res => {
            this.regions = res
        }, err => {


        })

    }

    onNext() {
        this.showRegForm = !this.showRegForm;

        if (this.company) {
            this.showCompanyForm = true
        }
        if (this.organizer) {
            this.showOrganizerForm = true;
        }
        if (this.member) {
            this.showMemberForm = true
        }
    }

    onMember() {
        this.organizer = false;
        this.member = true;
        this.company = false;
        this.initFormMemeber();
    }

    onOrganizer() {
        this.organizer = true;
        this.member = false;
        this.company = false;
        this.initFormVol();
    }

    onCompany() {
        this.organizer = false;
        this.member = false;
        this.company = true;
        this.initFormCompany();
    }

    onCancel() {
        this.organizer = false;
        this.member = true;
        this.company = false;
        this.registrationError = null;
        
        this.onNext();
    }


    public onSignup(form: any) {
        this.registrationError = null;
        this.authService.signup(form).subscribe(
            res => {
                this.isSignupCompleted = true;
                // this.router.navigate(['/home']);
            }, err => {
                this.signupForm.get('recaptcha').setValue(null);
                this.registrationError = err.value.error
            });
    }


    toSigin() {
        this.router.navigate(['/auth/login'])
    }



    public initFormMemeber() {
        this.signupForm = this.formBuilder.group(
          {
            'first_name': ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(40)])],
            'last_name': ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(40)])],
            'gender': ['', Validators.compose([Validators.required])],
            'email': ['', Validators.compose([Validators.required, Validators.email, Validators.minLength(3)])],
            'confirm_email': ['', Validators.compose([Validators.required, Validators.email, Validators.minLength(3)])],
            'mobile': ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            'confirm_password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            'recaptcha': ['', Validators.compose([Validators.required])],
            'agreementChecked': [false, Validators.pattern('true')]
          },
          {
            validator: this.passwordConfirm
          });
      }
    

      public initFormCompany() {
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


    public initFormVol() {
        this.signupForm = this.formBuilder.group(
            {
                'first_name': ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(40)])],
                'last_name': ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(40)])],
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
          return { invalid: true };
        }
      }


      public emailConfirm(AC: AbstractControl): { invalid: boolean } {
        if (AC.get('email').value !== AC.get('confirm_email').value) {
            return {invalid: true};
        }
    }
    
}
