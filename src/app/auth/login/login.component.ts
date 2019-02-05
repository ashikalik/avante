import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/api-services/auth.service';
import {UserAuthService} from '../../core/user-auth.service';
import {Observable, of, Subject} from "rxjs";
import {LoginBody, LoginResponse} from "../../models/login";
import {EventoError} from "../../models/error";
import { UserProfile } from '../../models/user-profile';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {


    public loginForm: FormGroup;
    public login: LoginResponse;
    public errorsLogin: EventoError;
    public profile: UserProfile;

    constructor(public formBuilder: FormBuilder,
                public authService: AuthService,
                public userAuthService: UserAuthService,
                public router: Router) {
    }


    ngOnInit() {
        this.initForm();

    }


    public initForm() {
        this.loginForm = this.formBuilder.group(
            {
                'username': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
                'password': ['', Validators.compose([Validators.required])]
            });
    }


    public onlogin(form: any) {

        const body: LoginBody = {
            'username': form.value.username,
            'password': form.value.password
        };


        this.authService.login(body).subscribe(res => {
            this.userAuthService.setToken(res.token);
             this.profile = this.userAuthService.getUserProfile();
             if(this.profile.data.user_type == 4){
                 this.router.navigate(['/seller/tickets']);
             }else{
                this.router.navigate(['/home'])                
             }
        }, err => {
            this.errorsLogin = err.value.error;
        });
    }


}
