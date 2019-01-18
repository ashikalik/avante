import { Injectable } from '@angular/core';
import { NetworkConfig } from '../network-layer/network.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LatestEvent } from "../models/latest-event";
import { EventDetails, Package } from "../models/event-details";

@Injectable({
    providedIn: 'root'
})
export class BuyTicketService {


    constructor(private httpClient: HttpClient) {
    }

    public isDateRequired(selectedPackage: Package): boolean{
        console.log(selectedPackage)
        if(selectedPackage.specific_tickets ===  1){
            return true;
        }
        else{
            return false;
        }
    }

    public validatePackage(form: any): Observable<any> {
        const body = {
            event_key: form.event_key,
            package_id: form.package_id,
            access_date:form.access_date,
        }
        const url = NetworkConfig.BASE_URL + NetworkConfig.VALIDATE_PACKAGE;
        return this.httpClient.post<any>(url,body);
      }


}