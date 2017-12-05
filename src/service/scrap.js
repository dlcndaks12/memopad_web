import axios from 'axios';

/* Scrap List */
export function getScraps(nationCode, city, category, limit, page) {
    return axios.get('api/scrap', {
        params: {
            nationCode: nationCode,
            city: city,
            category: category,
            limit: limit,
            page: page,
        },
    });
}

/* Scrap Write */
export function registerScrap(nationCode, cityIdx, categoryIdx, og) {
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

