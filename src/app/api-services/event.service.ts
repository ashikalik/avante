import {Injectable} from '@angular/core';
import {NetworkConfig} from '../network-layer/network.config';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LatestEvent} from "../models/latest-event";
import {EventDetails} from "../models/event-details";

@Injectable({
    providedIn: 'root'
})
export class EventService {


    constructor(private httpClient: HttpClient) {
    }


    public getLatestEvent(): Observable<LatestEvent> {
        const url = NetworkConfig.BASE_URL + NetworkConfig.LATEST_EVENTS;
        return this.httpClient.get<LatestEvent>(url);
    }

    public getEventDetail(eventKey: string): Observable<EventDetails> {
        const url = NetworkConfig.BASE_URL + NetworkConfig.VIEW_EVENT + eventKey;
        return this.httpClient.get<EventDetails>(url);
    }




}
