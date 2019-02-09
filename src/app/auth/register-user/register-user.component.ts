import { Component, OnInit, Output, EventEmitter,Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.sass']
})
export class RegisterUserComponent implements OnInit {

  @Output() onCancel: EventEmitter<any> = new EventEmitter();
  @Output() onRegister: EventEmitter<any> = new EventEmitter();

  public signupForm: FormGroup;

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
        'gender': ['', Validators.compose([Validators.required])],
        'email': ['', Validators.compose([Validators.required, Validators.email, Validators.minLength(3)])],
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


  public passwordConfirm(AC: AbstractControl): { invalid: boolean } {
    if (AC.get('password').value !== AC.get('confirm_password').value) {
      return { invalid: true };
    }
  }


  onCancelButton() {
    this.onCancel.emit();
  }


  onRegisterButton(form: any) {
    const body = {
      first_name: form.value.first_name,
      last_name: form.value.last_name,
      email: form.value.email,
      mobile: form.value.mobile,
      password: form.value.password,
      confirm_password: form.value.confirm_password,
      user_type: 5,
      gender: form.value.gender,
      recaptcha: form.value.recaptcha
    };
    this.onRegister.emit(body);
  }
}
