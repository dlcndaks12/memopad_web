import axios from 'axios';

/* Scrap List */
export function getScrapList(nationCode, cityIdx, categoryIdx, limit, page) {
  return axios.get('api/scrap', {
    params: {
      nationCode: nationCode,
      cityIdx: cityIdx,
      categoryIdx: categoryIdx,
      limit: limit,
      page: page,
    },
  })
}

/* Scrap Write */
export function writeScrap(nationCode, cityIdx, categoryIdx, og) {
  return axios.post(`/api/scrap`, {
    nationCode: nationCode,
    cityIdx: cityIdx,
    categoryIdx: categoryIdx,
    imageUrl: og.ogImageUrl,
    title: og.ogTitle,
    description: og.ogDescription,
    url: og.ogUrl,
  });
}
/* Og By Url */
export function getOgByUrl(url) {
  return axios.get(`/api/og`, {
    params: {
      url: url,
    }
  })
}

