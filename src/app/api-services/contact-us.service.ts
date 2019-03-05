import { Injectable } from '@angular/core';
import {NetworkConfig} from '../network-layer/network.config';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {


  constructor(private httpClient: HttpClient) {
  }

  public contactUs(form: any): Observable<any> {
    const body = {
        name: form.name,
        subject: form.subject,
        message:form.message,
        mobile: form.mobile,
        email: form.email,
        recaptcha: form.recaptcha
    }
    const url = NetworkConfig.BASE_URL + NetworkConfig.CONTACT_US;
    return this.httpClient.post<any>(url,body);
  }



}
