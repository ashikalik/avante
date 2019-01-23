import {Injectable} from '@angular/core';
import {NetworkConfig} from '../network-layer/network.config';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EventOrganizer} from "../models/event-organizer";

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



}
