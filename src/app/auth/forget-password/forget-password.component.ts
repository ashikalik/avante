import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginBody, LoginResponse} from "../../models/login";
import {EventoError} from "../../models/error";
import {AuthService} from "../../api-services/auth.service";
import {UserAuthService} from "../../core/user-auth.service";
import {Router} from "@angular/router";
import {ForgetPasswordRespons} from "../../models/forget-password";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.sass']
})
export class ForgetPasswordComponent implements OnInit {

    public forgetForm: FormGroup;
    public errorForget: EventoError;
    public forgetResponse: ForgetPasswordRespons


    constructor(public formBuilder: FormBuilder,
                public authService: AuthService,
                public userAuthService: UserAuthService,
                public title: Title,
                public meta: Meta,
                public router: Router) {
    }


    ngOnInit() {
        this.title.setTitle('استعادة كلمة المرور');
        this.meta.addTag({name: "description", content: 'استعادة كلمة مرور حسابك في ايفينتو'})

        this.forgetResponse = null;
        this.initForm();

    }


    public initForm() {
        this.forgetForm = this.formBuilder.group(
            {
                'username': ['', Validators.compose([Validators.required, Validators.email])],
                'recaptcha': ['', Validators.compose([Validators.required])],
            });
    }


    public onReset(form: any) {
      this.forgetResponse = null;

        this.authService.forgetPassword(form.value).subscribe(res => {
          this.forgetResponse = res;
        }, err => {
            this.forgetForm.get("recaptcha").reset();
            this.errorForget = err.value.error;
        });
    }

    contactUs() {
        this.router.navigate(['/contact-us'])
      }

}
