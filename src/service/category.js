import axios from 'axios';

/* Category List */
export function getCategories() {
  return axios.get('api/category');
}