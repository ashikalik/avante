

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NetworkConfig} from '../network-layer/network.config';
import {City} from "../models/city";




@Injectable({
    providedIn: 'root'
})

export class TicketsService {

    constructor(private httpClient: HttpClient) {

    }


    public getTicketList(limit: number, page: number, event_key: string, searchInput: any): Observable<any> {
        let url = NetworkConfig.BASE_URL + NetworkConfig.TICKET_LIST + event_key + '?limit=' + limit + '&page=' + page;
    
        if(searchInput) {
            url = url + '&search=' + searchInput;
        }
        return  this.httpClient.get<City>(url);
    }
    
    public getTicketDetails(invoic_id: any, event_key: string): Observable<any> {
        let url = NetworkConfig.BASE_URL + NetworkConfig.TICKET_DETAILS + event_key + '/' + invoic_id;
        return  this.httpClient.get<City>(url);
    }

}
