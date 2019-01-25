import { Injectable } from '@angular/core';
import { NetworkConfig } from '../network-layer/network.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Requests } from '../models/requests';
import { RequestDetials } from '../models/request-details';


@Injectable({
    providedIn: 'root'
})
export class RequestsService {


    constructor(private httpClient: HttpClient) {
    }


    public getRequests(event_key: string, limit: number, page: number, status: number, search: string): Observable<Requests> {
        let url = NetworkConfig.BASE_URL + NetworkConfig.REQUEST + '/' + event_key + '?limit=' + limit + '&page=' + page;
        if (status != null) {
            url = url + '&status=' + status;
        }
        if (search != null) {
            url = url + '&search=' + search;
        }
        return this.httpClient.get<Requests>(url);
    }


    public viewRequest(request_id: number, event_key: string): Observable<RequestDetials> {
        const url = NetworkConfig.BASE_URL + NetworkConfig.REQUEST + '/' + request_id + '/' + event_key;
        return this.httpClient.get<RequestDetials>(url);
    }

    public preAccept(form: any, list: any, event_key: string): Observable<any> {
        const url = NetworkConfig.BASE_URL + NetworkConfig.REQUEST + NetworkConfig.PRE_ACCEPT_REQUESTS + event_key;
        const body = {
            list: list,
            from_date: form.from_date,
            end_date: form.end_date,
            from_time: form.from_time,
            end_time: form.end_time,
            interview_location: form.interview_location,
            contact: form.contact
        }
        return this.httpClient.post<any>(url, body);
    }

    public reject(request_id: any, event_key: string): Observable<any> {
        const url = NetworkConfig.BASE_URL + NetworkConfig.REQUEST + NetworkConfig.REJECT_REQUEST + event_key;
        const body = {
            request_id: request_id
        }
        return this.httpClient.post<any>(url, body);
    }

    public finalAccept(request_id: any, event_key: string): Observable<any> {
        const url = NetworkConfig.BASE_URL + NetworkConfig.REQUEST + NetworkConfig.FinalAccept + event_key;
        const body = {
            request_id: request_id
        }
        return this.httpClient.post<any>(url, body);
    }


    public getFinalRating(event_key: string): Observable<any> {
        const url = NetworkConfig.BASE_URL + NetworkConfig.RATING_ORGANIZERS + event_key;
        return this.httpClient.get<any>(url);
    }

    public rateVolunteer(body: any, event_key: string): Observable<any> {
        const url = NetworkConfig.BASE_URL + NetworkConfig.RATING_ORGANIZERS + event_key;
        return this.httpClient.post<any>(url, body);
    }

}
