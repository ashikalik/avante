import {Meta} from "./meta";



export interface LoginResponse {
    meta: Meta;
    token: string;
}



export interface LoginBody {
    username: string;
    password: string;
}