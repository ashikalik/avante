export interface Meta {
    message: string;
    code: number;
}

export interface SellerReport {
    first_name: string;
    last_name: string;
    mobile: string;
    gender: number;
    user_id: number;
    total: number;
}

export interface Data {
    total_request: number;
    new_request: number;
    pre_accept: number;
    final_accept: number;
    rejected: number;
    invoices: number;
    online_free: number;
    online_paid: number;
    offline_cash: number;
    offline_machine: number;
    offline_free: number;
    seller: SellerReport[];
}

export interface Report {
    meta: Meta;
    data: Data;
}
