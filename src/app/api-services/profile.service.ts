import {Injectable} from '@angular/core';
import {NetworkConfig} from '../network-layer/network.config';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UpdateInformation, UpdatePassword} from "../models/user-profile";

@Injectable({
    providedIn: 'root'
})
export class ProfileService {


    constructor(private httpClient: HttpClient) {
    }


    public updateInfo(body: UpdateInformation, userID: number): Observable<any> {
        const url = NetworkConfig.BASE_URL + NetworkConfig.USERS + '/' + userID;
        return this.httpClient.put<any>(url, body);
    }

    public updatePassword(body: UpdatePassword, userID: number): Observable<any> {
        const url = NetworkConfig.BASE_URL + NetworkConfig.USERS + '/' + userID;
        return this.httpClient.put<any>(url, body);
    }

    public getInvoices(): Observable<any> {
        const url = NetworkConfig.BASE_URL + NetworkConfig.LIST_INVOCICE ;
        return this.httpClient.get<any>(url);
    }


}
