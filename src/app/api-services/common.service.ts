import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NetworkConfig} from '../network-layer/network.config';
import {City} from "../models/city";
import {EventType} from "../models/event-type";
import {Nationality} from "../models/nationality";
import {Educations} from "../models/educations";

@Injectable()
export class CommonService {

    constructor(private httpClient: HttpClient) {

    }


    getCity(): Observable<City> {
        const url = NetworkConfig.BASE_URL + NetworkConfig.CITY_LIST;
        return this.httpClient
            .get<City>(url);
    }

    getRegion(): Observable<City> {
        const url = NetworkConfig.BASE_URL + NetworkConfig.REGION_LIST;
        return this.httpClient
            .get<City>(url);
    }

    getEventType(): Observable<EventType> {
        const url = NetworkConfig.BASE_URL + NetworkConfig.EVENT_TYPE;
        return this.httpClient
            .get<EventType>(url);
    }

    getNationality(): Observable<Nationality> {
        const url = NetworkConfig.BASE_URL + NetworkConfig.NATIONALITIES;
        return this.httpClient
            .get<Nationality>(url);
    }

    getEducations(): Observable<Educations> {
        const url = NetworkConfig.BASE_URL + NetworkConfig.EDUCATIONS;
        return this.httpClient
            .get<Educations>(url);
    }

}
