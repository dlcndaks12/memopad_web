export function pathnameToPageName(pathname) {
    const firstPath = pathname.split('/')[1];
    let pageName;

    switch (firstPath) {
        case 'scrap': pageName = '스크랩'; break;
        case 'review': pageName = '발자국'; break;
        default: pageName = undefined;
    }

    return pageName;
}