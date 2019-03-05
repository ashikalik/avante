

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NetworkConfig } from '../network-layer/network.config';
import { City } from "../models/city";


@Injectable({
    providedIn: 'root'
})

export class SellerService {

    constructor(private httpClient: HttpClient) {
    }


    public listInvoices(page: number, searchInput: string): Observable<any> {
        let url = NetworkConfig.BASE_URL + NetworkConfig.LIST_INVOICE + '?page=' + page;

        if (searchInput) {
            url = url + '&search=' + searchInput;
        }
        return this.httpClient.get<any>(url);
    }


    public listTickets(invoice_id: number): Observable<any> {
        let body = {
            invoice_id: invoice_id
        };
        const url = NetworkConfig.BASE_URL + NetworkConfig.LAST_TICKET;
        return this.httpClient.post<any>(url, body);
    }



    public addVistor(form: any, event_key: string): any {

        const body = {
            package_id: form.package_id,
            first_name: form.first_name,
            last_name: form.last_name,
            mobile: form.mobile,
            email: form.email,
            num_ticket: form.num_ticket,
            access_date: form.access_date,
            payment_type: form.payment_type,
            list: form.visitors,
            event_key: event_key
        };
        const url = NetworkConfig.BASE_URL + NetworkConfig.CREATE_INVOICE;
        return this.httpClient.post<any>(url, body);
    }




    public viewEventDetails(event_key: any): any {
        const url = NetworkConfig.BASE_URL + NetworkConfig.SELLER_EVENT + event_key;
        return this.httpClient.get<any>(url);
    }

}
