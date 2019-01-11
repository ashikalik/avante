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

  public signup(form: any): Observable<any> {
    console.log(form);
    const url = NetworkConfig.BASE_URL + NetworkConfig.SING_UP;
    return this.httpClient.post<any>(url, form);
  }
}
