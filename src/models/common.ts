import { Student } from "./student";

export interface PaginationParams {
    limit : number;
    page : number;
    total : number;
}

export interface ListResponse<T>{
    data: T[];
    pagination : PaginationParams;
}


export interface ListResponse2<T>{
    data: {
        total: number;
        totalPage: number;
        student: Student[];
    };
    pagination : PaginationParams;
}


export interface ListParams{
    page : number;
    limit : number;
    sort: string;
    order : 'asc' | 'desc';
    city : string;
}


