import {Meta} from "./meta";



export interface EventDetails {
    meta: Meta;
    data: Data;
}



export interface Details {
    event_key: string;
    name: string;
    details: string;
    img?: any;
    lat?: any;
    lng?: any;
    address: string;
    company_name?: any;
    city: string;
    joining_status: number;
    ticket_payment: number;
    type: string;
    from_date: string;
    end_date: string;
    from_time: string;
    end_time: string;
    favorite?: any;
}



export interface Data {
    details: Details;
    packages?: any;
    eligibleToJoin: boolean;
    policy?: any;
}
