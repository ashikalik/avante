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

export interface Ticket {
    invoice_id: number;
    reference: string;
    package_name: string;
    first_name: string;
    last_name: string;
    email: string;
    mobile: string;
    name_ar: string;
    status_id: number;
    price: number;
    num_ticket: number;
    total_without_vat: number;
    vat: number;
    total_with_vat: number;
    event_name: string;
    seller_id: number;
    access_date?: any;
    package_id: number;
    created_at: string;
    updated_at: string;
    address: string;
    event_key: string;
}

export interface Tickets {
    meta: Meta;
    data: Ticket[];
}