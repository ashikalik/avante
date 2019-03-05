export interface Data {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    mail?: any;
    mobile: string;
    gender: number;
    user_type: number;
    company_name?: any;
    address?: any;
    city_id?: any;
    status_id: number;
    event_id?: any;
    is_trusted?: any;
    created_at: Date;
    updated_at: Date;
    is_password: boolean;
}

export interface UpdateInformation {
    first_name: string;
    last_name: string;
    mobile: string;
}


export interface UpdatePassword {
    current_password: string;
    new_password: string;
    confirm_password: string;
}

export interface UserProfile {
    data: Data;
    iat: number;
}
