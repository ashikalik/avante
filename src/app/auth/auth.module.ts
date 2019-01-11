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

import {CommonService} from "../api-services/common.service";
import {AuthService} from '../api-services/auth.service';
import { NetworkLayerModule } from '../network-layer/network-layer.module';
import { ReactiveFormsModule } from '@angular/forms';
import {RECAPTCHA_LANGUAGE, RECAPTCHA_SETTINGS, RecaptchaLoaderService, RecaptchaModule, RecaptchaSettings} from 'ng-recaptcha';
import {RecaptchaFormsModule} from 'ng-recaptcha/forms';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

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
    AuthRoutingModule,
    NetworkLayerModule,
    ReactiveFormsModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
    
  ],
  providers:[
    AuthService,
    CommonService
  ]
})
export class AuthModule { }
