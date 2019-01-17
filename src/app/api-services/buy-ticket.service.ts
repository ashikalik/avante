import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NetworkConfig } from '../network-layer/network.config';
import { City } from "../models/city";
import { EventType } from "../models/event-type";

@Injectable()
export class BuyTicketService {

    constructor(private httpClient: HttpClient) {

    }


    public validatePackage(event_key: any, package_id: any, access_date: any): Observable<any> {
        const body = {
            event_key: event_key,
            package_id: package_id,
            access_date:access_date,
        } 
        const url = NetworkConfig.BASE_URL + NetworkConfig.VALIDATE_PACKAGE;
        return this.httpClient.post<any>(url,body);
      }


}