import {Injectable} from '@angular/core';
import {NetworkConfig} from '../network-layer/network.config';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EventOrganizer} from "../models/event-organizer";
import {Terms} from "../models/tems";
import {Questions} from "../models/queestions";
import {Report} from "../models/report";
import {SellerInvoiceReport} from "../models/seller-invoice-report";
import {Supervisors} from "../models/supervisors";

@Injectable({
    providedIn: 'root'
})
export class OrganizerService {


    constructor(private httpClient: HttpClient) {
    }


    public getEvent(limit: number, page: number, company_id: string, event_key: string, name: string): Observable<EventOrganizer> {
        let url = NetworkConfig.BASE_URL + NetworkConfig.EVENT + '?limit=' + limit + '&page=' + page;

        if (company_id != null) {
            url = url + '&company_id=' + company_id;
        }

        if (event_key != null) {
            url = url + '&event_key=' + event_key;
        }

        if (name != null) {
            url = url + '&name=' + name;
        }
        return this.httpClient.get<EventOrganizer>(url);
    }

    public updateEventInfo(body: any ,event_key: string): Observable<any> {
        let url = NetworkConfig.BASE_URL + NetworkConfig.UPDATE_EVENT_INFO + event_key;
        return this.httpClient.put<any>(url, body);
    }

    public updateEventSetting(body: any ,event_key: string): Observable<any> {
        let url = NetworkConfig.BASE_URL + NetworkConfig.UPDATE_EVENT_SETTING  + event_key;
        return this.httpClient.put<any>(url, body);
    }

    public getEventPolicy(event_key: string): Observable<Terms> {
        let url = NetworkConfig.BASE_URL + NetworkConfig.EVENT_POLICIES + event_key;
        return this.httpClient.get<Terms>(url);
    }

    public createEventPolicy(body: any, event_key: string): Observable<any> {
        let url = NetworkConfig.BASE_URL + NetworkConfig.EVENT_POLICIES + event_key;
        return this.httpClient.post<any>(url, body);
    }

    public updateEventPolicy(body: any, event_key: string): Observable<any> {
        let url = NetworkConfig.BASE_URL + NetworkConfig.EVENT_POLICIES + 'update/' + event_key;
        return this.httpClient.put<any>(url, body);
    }

    public deleteEventPolicy(body: any, event_key: string): Observable<any> {
        let url = NetworkConfig.BASE_URL + NetworkConfig.EVENT_POLICIES + 'delete/' + event_key;
        return this.httpClient.put<any>(url, body);
    }

    public updateMOINumber(body: any, event_key: string): Observable<any> {
        let url = NetworkConfig.BASE_URL + NetworkConfig.UPDATE_MOI_NUMBER + event_key;
        return this.httpClient.put<any>(url, body);
    }

    public getEventQuestions(page: number, limit: number, event_key: string): Observable<Questions> {
        let url = NetworkConfig.BASE_URL + NetworkConfig.QUESTIONS + '/' + event_key + '?limit=' + limit + '&page=' + page;
        return this.httpClient.get<Questions>(url);
    }

    public createEventQuestions(body: any, event_key: string): Observable<Questions> {
        let url = NetworkConfig.BASE_URL + NetworkConfig.QUESTIONS + '/' + event_key;
        return this.httpClient.post<Questions>(url, body);
    }

    public updateEventQuestion(body: any, event_key: string): Observable<Questions> {
        let url = NetworkConfig.BASE_URL + NetworkConfig.QUESTIONS + '/update/' + event_key;
        return this.httpClient.put<Questions>(url, body);
    }

    public deleteEventQuestion(body: any, event_key: string): Observable<Questions> {
        let url = NetworkConfig.BASE_URL + NetworkConfig.QUESTIONS + '/delete/' + event_key;
        return this.httpClient.put<Questions>(url, body);
    }

    public getEventReport(event_key: string): Observable<Report> {
        let url = NetworkConfig.BASE_URL + NetworkConfig.REPORTS_OVERVIEW + event_key;
        return this.httpClient.get<Report>(url);
    }

    public getSellerInvoices(seller_id: number ,event_key: string): Observable<SellerInvoiceReport> {
        let url = NetworkConfig.BASE_URL + NetworkConfig.REPORTS_SELLER + event_key + '/' + seller_id;
        return this.httpClient.get<SellerInvoiceReport>(url);
    }

    public getEventSupervisors(event_key: string): Observable<Supervisors> {
        let url = NetworkConfig.BASE_URL + NetworkConfig.LIST_SUPERVISORS + event_key;
        return this.httpClient.get<Supervisors>(url);
    }



}
