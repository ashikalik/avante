import { Injectable } from '@angular/core';
import { NetworkConfig } from '../network-layer/network.config';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import {LoginBody, LoginResponse} from "../models/login";
import {ForgetPasswordRespons} from "../models/forget-password";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private httpClient: HttpClient) {
  }

  public signup(body: any): Observable<any> {
    const url = NetworkConfig.BASE_URL + NetworkConfig.USERS;
    return this.httpClient.post<any>(url, body);
  }


  public login(body: LoginBody): Observable<LoginResponse> {
    console.log('try login')
    const url = NetworkConfig.BASE_URL + NetworkConfig.LOGIN_URL;
    return this.httpClient.post<LoginResponse>(url, body);
  }


  public logout(): Observable<any> {
    const url = NetworkConfig.BASE_URL + NetworkConfig.LOGOUT_URL;
    return this.httpClient.get<any>(url);
  }

  public forgetPassword(body: any): Observable<ForgetPasswordRespons> {
    const url = NetworkConfig.BASE_URL + NetworkConfig.FORGET_PASSWORD;
    return this.httpClient.post<ForgetPasswordRespons>(url, body);
  }

  public resetPassword(form: any, token: any): Observable<any> {
    let body = {
      new_password: form.new_password,
      confirm_password: form.confirm_password
    }
    const url = NetworkConfig.BASE_URL + NetworkConfig.RESET_PASSWORD + token;
    return this.httpClient.post<any>(url, body);
  }

  public checkResetPasswordToken(token: any): Observable<any> {
    const url = NetworkConfig.BASE_URL + NetworkConfig.RESET_PASSWORD + token;
    return this.httpClient.get<any>(url);
  }


  public activateAccount(token: any): Observable<any> {
    const url = NetworkConfig.BASE_URL + NetworkConfig.ACTIVATE_ACCOUNT + token;
    return this.httpClient.get<any>(url);
  }

  public getUserDetials(): Observable<any> {
    const url = NetworkConfig.BASE_URL + NetworkConfig.LOGIN_URL;
    return this.httpClient.get<any>(url);
  }


}
