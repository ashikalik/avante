import {Injectable} from '@angular/core';
import {NetworkConfig} from '../network-layer/network.config';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UpdateInformation, UpdatePassword} from "../models/user-profile";
import {Invoices} from "../models/my-ticket";
import {Tickets} from "../models/tickets";

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

    public getInvoices(): Observable<Invoices> {
        const url = NetworkConfig.BASE_URL + NetworkConfig.LIST_INVOCICE ;
        return this.httpClient.get<Invoices>(url);
    }


    public getTickets(body: any): Observable<Tickets> {
        const url = NetworkConfig.BASE_URL + NetworkConfig.LIST_TICKETS_OF_INVOCE ;
        return this.httpClient.post<Tickets>(url, body);
    }




}
