import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginBody, LoginResponse } from "../../models/login";
import { EventoError } from "../../models/error";
import { AuthService } from "../../api-services/auth.service";
import { UserAuthService } from "../../core/user-auth.service";
import { Router } from "@angular/router";
import { ForgetPasswordRespons } from "../../models/forget-password";
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: 'app-reactivate-account',
  templateUrl: './reactivate-account.component.html',
  styleUrls: ['./reactivate-account.component.scss']
})
export class ReactivateAccountComponent implements OnInit {

  public reactivationForm: FormGroup;
  public errorReactivation: EventoError;
  public forgetResponse: ForgetPasswordRespons


  constructor(public formBuilder: FormBuilder,
    public authService: AuthService,
    public userAuthService: UserAuthService,
    public title: Title,
    public meta: Meta,
    public router: Router) {
  }


  ngOnInit() {
    this.title.setTitle('إعادة إرسال ايميل التحقق');
    this.meta.addTag({ name: "description", content: 'إعادة إرسال ايميل التحقق في إيفينتو' })

    this.forgetResponse = null;
    this.initForm();

  }


  public initForm() {
    this.reactivationForm = this.formBuilder.group(
      {
        'email': ['', Validators.compose([Validators.required, Validators.email])],
        'recaptcha': ['', Validators.compose([Validators.required])],
      });
  }


  public onReset(form: any) {
    this.forgetResponse = null;
    this.errorReactivation = null;
    console.log(form);

    this.authService.reactivateEmail(form.value).subscribe(res => {
      this.forgetResponse = res;
    }, err => {
        this.reactivationForm.get("recaptcha").reset();
        this.errorReactivation = err.value.error;
    });
  }

  contactUs() {
    this.router.navigate(['/contact-us'])
  }

}
