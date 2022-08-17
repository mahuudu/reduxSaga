import { City } from './../models/city';
import { ListResponse } from './../models/common';
import axiosClient from "./axiosClient"

const cityApi = {
    getAll(): Promise<ListResponse<City>>{
        const url = '/city/getListCity'  
        return axiosClient.get(url);
    }
}

export default cityApi;