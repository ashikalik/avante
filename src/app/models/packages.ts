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

export interface Package {
    is_free: number;
    max_tickets: number;
    name: string;
    package_id: number;
    price: number;
    specific_tickets: number;
    status_id: number;
    created_at: Date;
    updated_at: Date;
    description: string;
    audience_id: number;
    status_name?: any;
    audience_name: string;
}

export interface Packages {
    meta: Meta;
    data: Package[];
}
