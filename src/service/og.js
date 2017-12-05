import axios from 'axios';

/* Og By Url */
export function getOgByUrl(url) {
  return axios.get(`/api/og`, {
    params: {
      url: url,
    }
  })
}

