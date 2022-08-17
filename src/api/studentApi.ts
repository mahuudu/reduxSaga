import { Student } from './../models/student';
import { ListResponse, ListParams } from './../models/common';
import axiosClient from "./axiosClient"

const StudentApi = {
    getAll(params:any): Promise<any>{
        const url = '/student/getListStudent'  
        return axiosClient.get(url, { params });
    },
    getById(id:string): Promise<any>{
        const url = `/student/getByid/${id}`;
        return axiosClient.get(url);
    },
    add(data:Student): Promise<Student>{
        const url = '/student/add'  
        return axiosClient.post(url, data);
    },
    update(data:Student): Promise<Student>{
        const url = '/student/update'  
        return axiosClient.post(url, data);
    },
    remove(id:string): Promise<any>{
        const url = `/student/delete/${id}`;
        return axiosClient.delete(url);
    }
}

export default StudentApi;