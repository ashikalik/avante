import {Component, OnInit, Input} from '@angular/core';
import {AuthService} from '../../api-services/auth.service';
import {CommonService} from "../../api-services/common.service";
import {City} from "../../models/city";
import {Router} from '@angular/router';
import {EventoError} from "../../models/error";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

    showRegForm: boolean;
    isSignupCompleted: boolean = false;

    showMemberForm: boolean = false;
    showOrganizerForm: boolean = false;
    showCompanyForm: boolean = false;

    organizer: boolean = false;
    member: boolean = false;
    company: boolean = false;


    public cities: City;
    public registrationError: EventoError;
    constructor(private authService: AuthService,
                public router: Router,
                public commonService: CommonService) {
    }


    ngOnInit() {
        this.getCity();
        this.onMember();
        this.showRegForm = false;
    }

    getCity(): void {
        this.commonService.getCity().subscribe(res => {
            this.cities = res
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
    }

    onOrganizer() {
        this.organizer = true;
        this.member = false;
        this.company = false;
    }

    onCompany() {
        this.organizer = false;
        this.member = false;
        this.company = true;
    }

    onCancel() {
        this.organizer = false;
        this.member = true;
        this.company = false;

        this.onNext();
    }


    public onSignup(form: any) {
        this.authService.signup(form).subscribe(
            res => {
                this.isSignupCompleted = true;
                // this.router.navigate(['/home']);
            }, err => {
                this.registrationError = err.value.error
            });
    }


    toSigin() {
        this.router.navigate(['/auth/login'])
    }

}
