import { ConvertTo24 } from './../shared/convert-to-24.pipe';
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
import {Sales} from "../models/sales";
import {Packages} from "../models/packages";

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

    public updateEventInfo(form: any, lat: any, lng: any, imageURL: any, event_key: string): Observable<EventOrganizer> {
        let body = form;
        body.lat = lat;
        body.lng = lng;
        body.from_date = form.from_date.formatted;

        body.from_time = new ConvertTo24().transform(body.from_time, form.from_time_type);
        body.end_time = new ConvertTo24().transform(body.end_time, form.end_time_type);

        body.end_date = form.end_date.formatted;
        if (imageURL) {
            body.img = imageURL;
        }
        let url = NetworkConfig.BASE_URL + NetworkConfig.UPDATE_EVENT_INFO + event_key;
        return this.httpClient.put<EventOrganizer>(url, body);
    }

    public updateEventSetting(body: any, event_key: string): Observable<any> {
        let url = NetworkConfig.BASE_URL + NetworkConfig.UPDATE_EVENT_SETTING + event_key;
        return this.httpClient.put<any>(url, body);
    }

    public getEventPolicy(page: number, event_key: string): Observable<Terms> {
        let url = NetworkConfig.BASE_URL + NetworkConfig.EVENT_POLICIES + event_key + '?page=' + page;
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

    public getSellerInvoices(seller_id: number, page: number, event_key: string): Observable<SellerInvoiceReport> {
        let url = NetworkConfig.BASE_URL + NetworkConfig.REPORTS_SELLER + event_key + '/' + seller_id + '?page=' + page;
        return this.httpClient.get<SellerInvoiceReport>(url);
    }

    public getEventSupervisors(page: number, search: string, status_id: string, event_key: string): Observable<Supervisors> {
        let url = NetworkConfig.BASE_URL + NetworkConfig.LIST_SUPERVISORS + event_key + '?page=' + page;

        if(search)
            url = url + '&search=' + search

        if(status_id)
            url = url + '&status_id=' + status_id

        return this.httpClient.get<Supervisors>(url);
    }

    public createEventSupervisor(body: any, event_key: string): Observable<any> {
        let url = NetworkConfig.BASE_URL + NetworkConfig.CREATE_SUPERVISOR + event_key;
        return this.httpClient.post<any>(url, body);
    }

    public updateEventSupervisor(form: any, supervisor_id: number, event_key: string): Observable<any> {
        const body = {
            supervisor_id: supervisor_id,
            first_name: form.first_name,
            last_name: form.last_name,
            mobile: form.mobile,
            gender: form.gender,
            requests: form.requests,
            sellers: form.sellers,
            mail: form.mail,
            status_id: Number(form.status_id)
        };
        const url = NetworkConfig.BASE_URL + NetworkConfig.UPDATE_SUPERVISOR + event_key;
        return this.httpClient.put<any>(url, body);
    }

    public deleteEventSupervisor(supervisor_id: number, event_key: string): Observable<any> {
        const body = {
            supervisor_id: supervisor_id,
            status_id: 4
        };
        const url = NetworkConfig.BASE_URL + NetworkConfig.UPDATE_SUPERVISOR + event_key;
        return this.httpClient.put<any>(url, body);
    }

    public getEventSales(page: number, search: string, status_id: string, event_key: string): Observable<Sales> {
        let url = NetworkConfig.BASE_URL + NetworkConfig.GET_SELLER + event_key + '?page=' + page;

        if(search)
            url = url + '&search=' + search

        if(status_id)
            url = url + '&status_id=' + status_id

        return this.httpClient.get<Sales>(url);
    }

    public createEventSales(body: any, event_key: string): Observable<any> {
        let url = NetworkConfig.BASE_URL + NetworkConfig.CREATE_SELLER + event_key;
        return this.httpClient.post<any>(url, body);
    }

    public updateEventSales(form: any, seller_id: number, event_key: string): Observable<any> {
        const body = {
            seller_id: seller_id,
            first_name: form.first_name,
            last_name: form.last_name,
            mobile: form.mobile,
            gender: form.gender,
            mail: form.mail,
            status_id: Number(form.status_id)
        }
        const url = NetworkConfig.BASE_URL + NetworkConfig.UPDATE_SELLER + event_key;
        return this.httpClient.put<any>(url, body);
    }

    public deleteEventSales(sales_id: number, event_key: string): Observable<any> {
        const body = {
            seller_id: sales_id,
            status_id: 4
        };
        const url = NetworkConfig.BASE_URL + NetworkConfig.UPDATE_SELLER + event_key;
        return this.httpClient.put<any>(url, body);
    }

    public getEventPackages(page: number, event_key: string): Observable<Packages> {
        let url = NetworkConfig.BASE_URL + NetworkConfig.PACKAGES + event_key + '?page=' + page;
        return this.httpClient.get<Packages>(url);
    }

    public createEventPackage(form: any, event_key: string): Observable<any> {
        if (form.specific_tickets == 2)
            form.max_tickets = 0;

        if (form.is_free == 2)
            form.price = 0;


        let body = {
            name: form.name,
            description: form.description,
            special_day: Number(form.special_day),
            specific_tickets: Number(form.specific_tickets),
            max_tickets: Number(form.max_tickets),
            is_free: Number(form.is_free),
            price: Number(form.price),
            audience_id: form.audience_id

        }


        const url = NetworkConfig.BASE_URL + NetworkConfig.PACKAGES + event_key;
        return this.httpClient.post<any>(url, body);
    }

    public updateEventPackage(form: any, package_id: number, event_key: string): Observable<any> {
        const body = {
            package_id: package_id,
            name: form.name,
            description: form.description,
            special_day: Number(form.special_day),
            specific_tickets: Number(form.specific_tickets),
            max_tickets: Number(form.max_tickets),
            is_free: Number(form.is_free),
            price: Number(form.price),
            status_id: Number(form.status_id),
            audience_id: form.audience_id
        };
        const url = NetworkConfig.BASE_URL + NetworkConfig.PACKAGES + event_key;
        return this.httpClient.put<any>(url, body);
    }

    public deleteEventPackage(package_id: number, event_key: string): Observable<any> {
        const body = {
            package_id: package_id,
            status_id: 3
        }
        const url = NetworkConfig.BASE_URL + NetworkConfig.PACKAGES + event_key;
        return this.httpClient.put<any>(url, body);
    }


}
