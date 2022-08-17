import axiosClient from "./axiosClient"
import { User } from './../models/user';

const AuthApi = {
    login(data:any): Promise<any>{
        const url = '/auth/login'  
        return axiosClient.post(url, data );
    },
}

export default AuthApi;