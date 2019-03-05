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

export interface Package {
    package_id: number;
    event_id: number;
    name: string;
    description: string;
    specific_tickets: number;
    max_tickets: number;
    is_free: number;
    price: number;
    audience_id: number;
    status_id: number;
    created_at: Date;
    updated_at: Date;
    audience_name: string;
}

export interface Policy {
    policy: string;
}

export interface Data {
    details: Details;
    packages: Package[];
    eligibleToJoin: boolean;
    policy: Policy[];
}

export interface Meta {
    message: string;
    code: number;
}

