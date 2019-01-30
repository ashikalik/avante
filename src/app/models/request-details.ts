import {Meta} from "./meta";
import {requestObj} from "./requests";

export interface RequestDetials {
    meta: Meta;
    data: RequestDetialsObj;
  }
  
 export interface RequestDetialsObj {
    request: requestObj;
    educational_qualification: Educationalqualification[];
    skills: Skill[];
    experience: Experience[];
    question: Question[];
  }
  
  export  interface Experience {
    name: string;
    role: string;
    from_date: string;
    end_date: string;
  }
  
  export  interface Skill {
    name: string;
  }
  
  export  interface Educationalqualification {
    name: string;
    from_date: string;
    end_date: string;
    education: string;
  }

  export interface Question{
    question: string,
    id: number,
    rating: number,
    selectedRate: number
  }