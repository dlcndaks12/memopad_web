import axios from 'axios';
import * as path from 'config/path';

export function setting() {
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

export function setCookie(cName, cValue, cDay) {
    const expire = new Date();
    expire.setDate(expire.getDate() + cDay);
    let cookies = cName + '=' + cValue + '; path=/ ';
    if (typeof cDay !== 'undefined') {
        cookies += ';expires=' + expire.toGMTString() + ';';
    }
    document.cookie = cookies;
}

export function getCookie(cName) {
    cName = cName + '=';
    const cookieData = document.cookie;
    let start = cookieData.indexOf(cName);
    let cValue = '';
    if(start !== -1){
        start += cName.length;
        let end = cookieData.indexOf(';', start);
        if (end === -1) {
            end = cookieData.length;
        }
        cValue = cookieData.substring(start, end);
    }
    return cValue;
}

export function deleteCookie(cName) {
    setCookie(cName, '', -1);
}