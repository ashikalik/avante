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

export interface Supervisor {
    user_id: number;
    first_name: string;
    last_name: string;
    gender: number;
    mobile: string;
    mail: string;
    username: string;
    requests: number;
    sellers: number;
    status_id: number;
    created_at: Date;
    updated_at: Date;
    status_name: string;
}

export interface Supervisors {
    meta: Meta;
    data: Supervisor[];
}