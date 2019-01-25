import {Injectable} from '@angular/core';
import {NetworkConfig} from '../network-layer/network.config';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EventOrganizer} from "../models/event-organizer";
import {Terms} from "../models/tems";

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



}
