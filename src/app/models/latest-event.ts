import {Meta} from "./meta";



export interface LatestEvent {
    meta: Meta;
    data: latestEventObj[];
}



export interface latestEventObj {
    event_key: string;
    name: string;
    details: string;
    img?: any;
    company_name?: any;
    city: string;
    type: string;
    from_date: string;
    end_date: string;
    from_time: string;
    end_time: string;
    address: string;
}

