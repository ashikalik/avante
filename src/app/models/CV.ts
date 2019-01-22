export interface Meta {
    code: number;
}

export interface Cv {
    bio: string;
    nationality_code: number;
    name: string;
    birthday: string;
    age: number;
}

export interface EducationQualification {
    eq_id: number;
    qualification_name: string;
    education_id: number;
    education_name: string;
    from_date: string;
    end_date: string;
}

export interface Experience {
    id: number;
    company_name: string;
    role: string;
    from_date: string;
    end_date: string;
}

export interface Skill {
    skill_id: number;
    name: string;
}

export interface Data {
    cv: Cv;
    education?: EducationQualification[];
    skill?: Skill[];
    experience?: Experience[];
}

export interface CVDetails {
    meta: Meta;
    data: Data;
}