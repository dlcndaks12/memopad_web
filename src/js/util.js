import axios from 'axios';
import * as path from 'config/path';

export function setting() {
    axios.defaults.baseURL = path.__api__;
    axios.interceptors.response.use((response) => {
        return response.data;
    }, (error) => {
        if (error.response) {
          return Promise.reject(error.response.data);
        } else {
          return Promise.reject(error);
        }
    });
};