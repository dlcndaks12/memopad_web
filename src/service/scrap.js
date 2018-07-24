import axios from 'axios';

/* Scrap List */
export function getScrapList(scrapCondition) {
    const nationCode = scrapCondition.nationCode;
    const limit = scrapCondition.limit;
    const page = scrapCondition.page;
    let city = scrapCondition.city;
    let category = scrapCondition.category;

    if (city === 'none') city = [-1];
    if (category === 'none') category = [-1];
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

/* Scrap Detail */
export function getScrap(idx) {
    return axios.get(`api/scrap/${idx}`);
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
        map: og.map,
    });
}

/* Scrap Update */
export function updateScrap(scrapIdx, nationCode, cityIdx, categoryIdx, og) {
    return axios.put(`/api/scrap/${scrapIdx}`, {
        nationCode: nationCode,
        cityIdx: cityIdx,
        categoryIdx: categoryIdx,
        title: og.ogTitle,
        description: og.ogDescription,
        map: og.map,
    });
}

/* Scrap Delete */
export function deleteScrap(scrapIdx) {
    return axios.delete(`/api/scrap/${scrapIdx}`, {
        scrapIdx: scrapIdx,
    });
}

/* Scrap Like */
export function likeScrap(scrapIdx) {
    return axios.post(`/api/scrap/like/${scrapIdx}`, {
        scrapIdx: scrapIdx,
    });
}

/* Scrap Like Cancel */
export function likeScrapCancel(scrapIdx) {
    return axios.delete(`/api/scrap/like/${scrapIdx}`, {
        scrapIdx: scrapIdx,
    });
}

