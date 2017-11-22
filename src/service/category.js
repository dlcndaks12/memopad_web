import axios from 'axios';

/* Category List */
export function getCategoryList() {
  return axios.get('api/category');
}