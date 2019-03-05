export interface Query {
    order: string;
    sort: string;
    page: number;
    total: number;
    skip: number;
    limit: number;
}

export interface Filters {
}

export interface Meta {
    query: Query;
    filters: Filters;
    message: string;
    code: number;
}

export interface EventData {
    favorite?: any;
    event_id: number;
    name: string;
    details: string;
    img: string;
    company_name: string;
    city: string;
    type: string;
    region_name: string;
    from_date: string;
    end_date: string;
    from_time: string;
    end_time: string;
}

export interface SearchEvents {
    meta: Meta;
    data: EventData[];
}