import {Meta} from "./meta";



export interface EventType {
    meta: Meta;
    data: eventTypeObj[];
}



export interface eventTypeObj {
    id: number;
    name: string;
}

