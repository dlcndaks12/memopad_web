import axios from 'axios';
import * as path from './path';
import { getCookie } from 'util/cookie';

export function initAxios() {
    axios.defaults.baseURL = path.apiUrl;
    axios.defaults.timeout = 8000;
    setAuthorization();
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

export function setAuthorization() {
    axios.defaults.headers.common['Authorization'] = getCookie('Authentication');
}