export interface Meta {
    code: number;
}

export interface Audience {
    audience_id: number;
    name: string;
}

export interface Audiences {
    meta: Meta;
    data: Audience[];
}