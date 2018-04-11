import axios from 'axios';

/* Scrap List */
export function getScraps(scrapCondition) {
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

