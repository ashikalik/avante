
export interface Meta {
    message: string;
    code: number;
}

export interface errorObj {
    location: string;
    param: string;
    msg: string;
}

export interface EventoError {
    meta: Meta;
    errors: errorObj[];
    user?: boolean;
}
