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

    public isDateRequired(selectedPackage: Package): boolean {
        if (selectedPackage.specific_tickets === 1) {
            return true;
        }
        else {
            return false;
        }
    }

    public validatePackage(form: any): Observable<any> {
        const body = {
            event_key: form.event_key,
            package_id: form.package_id,
            access_date: form.access_date,
        }
        const url = NetworkConfig.BASE_URL + NetworkConfig.VALIDATE_PACKAGE;
        return this.httpClient.post<any>(url, body);
    }


    public createInvoice(form: any, event_key: string): Observable<any> {

        let access_date;
        if (form.access_date && form.access_date.formatted) {
            access_date = form.access_date.formatted
        }
        var body = {
            event_key: event_key,
            package_id: form.package_id,
            first_name: form.first_name,
            last_name: form.last_name,
            mobile: form.mobile,
            email: form.email,
            num_ticket: form.num_ticket,
            access_date: access_date,
            list: form.visitors,
            recaptcha: form.recaptcha
        };

        const url = NetworkConfig.BASE_URL + NetworkConfig.CREATE_INVOICE_PAYMENT
        return this.httpClient.post<any>(url, body);
    }

    public validatePayment(reference: string): Observable<any> {

        const body = {
            reference: reference
        }
        const url = NetworkConfig.BASE_URL + NetworkConfig.CHECK_INVOICE_STATUS
        return this.httpClient.post<any>(url, body);
    }

    public getMobileInvoice(reference: string): Observable<any> {

        const body = {
            reference: reference
        }
        const url = NetworkConfig.BASE_URL + NetworkConfig.GET_MOBILE_INVOICE
        return this.httpClient.post<any>(url, body);
    }


}