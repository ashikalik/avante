export interface Meta {
    code: number;
}

export interface Education {
    id: number;
    name: string;
}

export interface Educations {
    meta: Meta;
    data: Education[];
}
