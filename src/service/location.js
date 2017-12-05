import axios from 'axios';

/* Nation List */
export function getNations() {
  return axios.get('api/nation');
}

/* City List */
export function getCities() {
  return axios.get('api/city/all');
}