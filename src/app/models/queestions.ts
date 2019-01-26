
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

export interface Question {
    id: number;
    question: string;
}

export interface Questions {
    meta: Meta;
    data: Question[];
}
