import { Injectable } from '@angular/core';
import { NetworkConfig } from '../network-layer/network.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LatestEvent } from "../models/latest-event";
import { EventDetails } from "../models/event-details";

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

    public search(limit: number, page: number, name: any, type_id: any, region: any, need_vol: any): Observable<LatestEvent> {
        let url = NetworkConfig.BASE_URL + NetworkConfig.SEARCH + '?limit=' + limit + '&page=' + page;

        if (name != null && name !== '') {
            url = url + '&name=' + name;
        }

        if (type_id != null && type_id !== '') {
            url = url + '&type_id=' + type_id;
        }

        if (region != null && region !== '') {
            url = url + '&region=' + region;
        }

        if (need_vol != null && need_vol !== '') {
            url = url + '&need_vol=' + need_vol;
        }

        return this.httpClient.get<LatestEvent>(url);

    }


}
