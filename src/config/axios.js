import axios from 'axios';
import * as path from 'config/path';
import { getCookie } from 'util/cookie';

export function init() {
    axios.defaults.baseURL = path.__api__;
    axios.defaults.headers.common['Authorization'] = getCookie('Authentication');
    axios.interceptors.response.use((response) => {
        return response.data;
    }, (error) => {
        if (error.response) {
            return Promise.reject(error.response.data);
        } else {
            return Promise.reject(error);
        }
    });
}