import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/api-services/auth.service';
import {UserAuthService} from '../../core/user-auth.service';
import {Observable, of, Subject} from "rxjs";
import {LoginBody, LoginResponse} from "../../models/login";
import {catchError} from "rxjs/operators";


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {


    public loginForm: FormGroup;
    public login$: Observable<LoginResponse>;
    public loadingError$ = new Subject<boolean>();


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


    public login(form: any) {

        const body: LoginBody = {
            'username': form.value.username,
            'password': form.value.password
        };


        console.log('login')
        this.login$ = this.authService.login(body)
            .pipe(
                catchError((error) => {

                    this.loadingError$.next(true);
                    return of();
                })
            );
    }


}
