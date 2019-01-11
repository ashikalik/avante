import {Injectable} from '@angular/core';
import {NetworkConfig} from '../network-layer/network.config';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LatestEvent} from "../models/latest-event";

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


}
