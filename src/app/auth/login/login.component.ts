import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/api-services/auth.service';
import { UserAuthService } from '../../core/user-auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {


  public loginForm: FormGroup;


  constructor(public formBuilder: FormBuilder,
    public authService: AuthService,
    public userAuthService:UserAuthService,
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

    const body = {
      'username': form.value.username,
      'password': form.value.password
    };


    this.authService.login(body).subscribe(
      res => {
        this.userAuthService.setToken(res.token);
        this.router.navigate(['/home']);

      }, err => {
      });
  }




}
