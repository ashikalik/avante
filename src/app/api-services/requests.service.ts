import { Injectable } from '@angular/core';
import { NetworkConfig } from '../network-layer/network.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Requests } from '../models/requests';
import { RequestDetials } from '../models/request-details';
import { DatePickerInputPipe } from '../shared/date-picker-input.pipe';


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


    public getRequestDetails(request_id: number, event_key: string): Observable<RequestDetials> {
        const url = NetworkConfig.BASE_URL + NetworkConfig.REQUEST + '/' + request_id + '/' + event_key;
        return this.httpClient.get<RequestDetials>(url);
    }

    public preAccept(form: any, list: any, event_key: string): Observable<any> {
        const url = NetworkConfig.BASE_URL + NetworkConfig.REQUEST + NetworkConfig.PRE_ACCEPT_REQUESTS + event_key;
        
        const body = {
            list: list,
            from_date: form.from_date.formatted,
            end_date: form.end_date.formatted,
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


    //get rating list after event //rated and not rated
    public getFinalRating(event_key: string): Observable<any> {
        const url = NetworkConfig.BASE_URL + NetworkConfig.RATING_ORGANIZERS + event_key;
        return this.httpClient.get<any>(url);
    }

    public rateVolunteer(form: any, event_key: string): Observable<any> {
        let body = {
            user_id: form.user_id,
            request_id: form.request_id,
            rating: form
          };
        const url = NetworkConfig.BASE_URL + NetworkConfig.RATING_ORGANIZERS + event_key;
        return this.httpClient.post<any>(url, body);
    }


    //get rating interview //accepted and rejected
    public getRatingList(event_key: string, page: number , limit: number, searchInput: string): Observable<any> {
        let url = NetworkConfig.BASE_URL + NetworkConfig.RatingList + event_key + '?limit=' + limit + '&page=' + page;
        if (status != null) {
            url = url + '&search=' + searchInput;
        }
        return this.httpClient.get(url);
    }


    //get all preaccepted requests
    public getPreAcceptedList(event_key: string, limit: number, page: number, searchInput: string): Observable<any>{
        let url = NetworkConfig.BASE_URL + NetworkConfig.INTERVIEWS + event_key  + '?limit=' + limit + '&page=' + page;
        if (status != null) {
            url = url + '&search=' + searchInput;
        }
        return this.httpClient.get(url);
    }

    public getRequestDetialsForInterview(request: any, event_key:string): Observable<any>{
        const url = NetworkConfig.BASE_URL + NetworkConfig.INTERVIEWS + request + '/' + event_key;
        return this.httpClient.get(url);
    }


    public rateQuestion(form: any, event_key: string): Observable<any>{
        const body = {
            request_id: form.request_id,
            question_id: form.question_id,
            rating: form.rating
        }
        const url = NetworkConfig.BASE_URL + NetworkConfig.RATING_QUESTION + event_key;
        return this.httpClient.post(url , body);
    }

    public endInterview(comment: any, request: any, event_key:string): Observable<any>{
        const body = {
            comment: comment,
        }
        const url = NetworkConfig.BASE_URL + NetworkConfig.END_INTERVIEW + request + '/' + event_key;
        return this.httpClient.post(url, body);
    }        

}
