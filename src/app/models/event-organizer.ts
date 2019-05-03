
export interface Query {
    order: string;
    sort: string;
    page: number;
    total: number;
    skip: number;
    limit: number;
}

export interface Filters {
    event_key: string;
}

export interface Meta {
    query: Query;
    filters: Filters;
    message: string;
    code: number;
}

export interface Event {
    event_key: string;
    name: string;
    details: string;
    img: string;
    type_id: number;
    city_id: number;
    from_date: string;
    end_date: string;
    from_time: string;
    end_time: string;
    address: string;
    created_at: Date;
    updated_at: Date;
    crNumber?: any;
    lng: number;
    lat: number;
    status_id: number;
    maximum_capacity: number;
    minimum_age: number;
    audience_id: number;
    audience_gender: string;
    status_name: string;
    city: string;
    region_name: string;
    region_id: number;
    type: string;
    joining_status: number;
    ticket_payment: number;
    publish_status: number;
    public_status: number;
    company: string;
}

export interface EventOrganizer {
    meta: Meta;
    data: Event[];
}