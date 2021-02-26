import axios from 'axios';
import {config} from "../../config";

const configOMB = {
    baseURL: 'http://www.omdbapi.com',
}

const key = config.MY_KEY;
const axiosInstance = axios.create(configOMB);

const API = {
    searchFilmsByTitle: (title: string) => {
        return axiosInstance.get(`${key}&s=${title}`)
            .then(response => response.data)
    },
    searchFilmsByType: (title: string = "", type: string) => {
        return axiosInstance.get(`${key}&s=${title}&type=${type}`)
            .then(response => response.data)
    }
};


export default API;
