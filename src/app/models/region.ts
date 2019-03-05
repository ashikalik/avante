import { Meta } from "./meta";


export interface Region {
    meta: Meta;
    data: RegionObj[];
}

export interface RegionObj {
    region_id: number;
    name: string;
}