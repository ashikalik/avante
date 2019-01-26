
export interface Query {
    order: string;
    sort: string;
    page: number;
    total: number;
    skip: number;
    limit: number;
}

export interface Filters {
}

export interface Meta {
    query: Query;
    filters: Filters;
    message: string;
    code: number;
}

export interface Datum {
    invoice_id: number;
    first_name: string;
    last_name: string;
    payment_type: string;
    num_ticket: number;
    total_with_vat: number;
    is_added_tarfeeh: number;
    created_at: Date;
}

export interface SellerInvoiceReport {
    meta: Meta;
    data: Datum[];
}