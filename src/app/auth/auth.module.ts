import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { RegisterCompanyComponent } from './register-company/register-company.component';
import { RegisterVoluComponent } from './register-volu/register-volu.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthRootComponent } from './auth-root/auth-root.component';


import {AuthService} from '../api-services/auth.service';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RegisterUserComponent,
    RegisterCompanyComponent,
    RegisterVoluComponent,
    ActivateAccountComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    AuthRootComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  providers:[
    AuthService
  ]
})
export class AuthModule { }
