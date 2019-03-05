import {Meta} from "./meta";



export interface City {
    meta: Meta;
    data: cityObj[];
}



export interface cityObj {
    id: number;
    region_id: number;
    name: string;
}

