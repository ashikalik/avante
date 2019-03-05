import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthService} from '../../api-services/auth.service';
import {EventoError} from '../../models/error';
import {Meta, Title} from "@angular/platform-browser";

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.sass']
})
export class ResetPasswordComponent implements OnInit {


    public resetForm: FormGroup;
    public token: any;
    public isTokenValid: boolean;
    public isUpdated: boolean;
    public error: EventoError;

    constructor(public formBuilder: FormBuilder,
                public authService: AuthService,
                private route: ActivatedRoute,
                public title: Title,
                public meta: Meta,
                public router: Router) {
    }


    ngOnInit() {
        this.title.setTitle('إعادة تعيين كلمة المرور');
        this.meta.addTag({name: "description", content: 'إعادة تعييم كلمة المرور في ايفينتو'})
        this.isTokenValid = false;
        this.initForm();
        this.route.params.subscribe(params => {
            this.token = params['id'];
            this.checkResetPassword(this.token);
        });
    }


    public initForm() {
        this.resetForm = this.formBuilder.group(
            {
                'new_password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
                'confirm_password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
            });
    }


    public resetPassword(form: any) {
        this.authService.resetPassword(form.value, this.token).subscribe(
            res => {
                this.isUpdated = true;
                this.router.navigate(['/auth/login'])
                // this.router.navigate(['/home']);
            }, err => {
                this.error = err.value.error;
            });
    }

    public checkResetPassword(token: any) {
        this.authService.checkResetPasswordToken(token).subscribe(
            res => {
                this.isTokenValid = true;
                // this.router.navigate(['/home']);
            }, err => {
                this.error = err.value.error;

            });
    }

    contactUs() {
        this.router.navigate(['/contact-us'])
    }


}
