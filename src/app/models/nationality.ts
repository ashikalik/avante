export interface Meta {
    code: number;
}

export interface National {
    id: number;
    name: string;
}

export interface Nationality {
    meta: Meta;
    data: National[];
}