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

export interface Term {
    policy_id: number;
    policy: string;
}

export interface Terms {
    meta: Meta;
    data: Term[];
}