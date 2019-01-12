import { Injectable } from '@angular/core';
import { NetworkConfig } from '../network-layer/network.config';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private httpClient: HttpClient) {
  }

  public signup(body: any): Observable<any> {
    const url = NetworkConfig.BASE_URL + NetworkConfig.SING_UP;
    return this.httpClient.post<any>(url, body);
  }


  public login(body: any): Observable<any> {
    const url = NetworkConfig.BASE_URL + NetworkConfig.LOGIN_URL;
    return this.httpClient.post<any>(url, body);
  }


  public logout(): Observable<any> {
    const url = NetworkConfig.BASE_URL + NetworkConfig.LOGOUT_URL;
    return this.httpClient.get<any>(url);
  }

  public forgetPassword(body: any): Observable<any> {
    const url = NetworkConfig.BASE_URL + NetworkConfig.FORGET_PASSWORD;
    return this.httpClient.post<any>(url, body);
  }

  public resetPassword(body: any, token: any): Observable<any> {
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
