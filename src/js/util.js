import axios from 'axios';
import * as path from 'config/path';

export function setting() {
    axios.defaults.baseURL = path.__api__;
    axios.interceptors.response.use((response) => {
        return response.data;
    }, (error) => {
        return Promise.reject(error.response.data);
    });
};