import {Meta} from "./meta";

export interface Request {
    request_id: number;
    comment: string;
    first_name: string;
    last_name: string;
    mobile: string;
    email: string;
    status: string;
    joining_status: number;
    nationality: string;
    bio: string;
    birthday: string;
    age: number;
    selectedRate: number;
}

export interface Requests {
    meta: Meta;
    data: Request[];
}



