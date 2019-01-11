import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from "../../models/city";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register-volu',
  templateUrl: './register-volu.component.html',
  styleUrls: ['./register-volu.component.sass']
})
export class RegisterVoluComponent implements OnInit {

  @Input() cities$: Observable<City>;
  @Output() onCancel: EventEmitter<any> = new EventEmitter();
  @Output() onRegister: EventEmitter<any> = new EventEmitter();

  public signupForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  public initForm() {
    this.signupForm = this.formBuilder.group(
      {
        'first_name': ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(40)])],
        'last_name': ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(40)])],
        'city_id': ['', Validators.compose([Validators.required])],
        'gender': ['', Validators.compose([Validators.required])],
        'email': ['', Validators.compose([Validators.required, Validators.email, Validators.minLength(3)])],
        'mobile': ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
        'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        'confirm_password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        'agreementChecked': [false, Validators.pattern('true')],
        'recaptcha': ['', Validators.compose([Validators.required])],
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
    console.log(form.value);
    const body = {
      first_name: form.value.first_name,
      last_name: form.value.last_name,
      city_id: form.value.city_id,
      email: form.value.email,
      mobile: form.value.mobile,
      password: form.value.password,
      confirm_password: form.value.confirm_password,
      user_type: 2,
      gender: form.value.gender,
      recaptcha: form.value.recaptcha
    };
    this.onRegister.emit(body);
  }



}
