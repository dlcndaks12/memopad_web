import axios from 'axios';

/* Nation List */
export function getNationList() {
  return axios.get('api/nation');
}

/* City List */
export function getCityList() {
  return axios.get('api/city/all');
}