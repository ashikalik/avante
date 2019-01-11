import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NetworkConfig} from '../network-layer/network.config';
import {City} from "../models/city";

@Injectable()
export class CommonService {

    constructor(private httpClient: HttpClient) {

    }


    getCity(): Observable<City> {
        const url = NetworkConfig.BASE_URL + NetworkConfig.CITY_LIST;
        return this.httpClient
            .get<City>(url);
    }

}
