export function setCookie(cName, cValue, cDay) {
    const expire = new Date();
    let domain = window.location.hostname.split('.');
    domain = `.${domain[domain.length - 2]}.${domain[domain.length - 1]}`;
    expire.setDate(expire.getDate() + cDay);
    let cookies = `${cName}=${cValue}; domain=${domain}; path=/;`;
    if (typeof cDay !== 'undefined') {
        cookies += ';expires=' + expire.toGMTString() + ';';
    }
    document.cookie = cookies;
}

export function getCookie(cName) {
    cName = cName + '=';
    const cookieData = document.cookie;
    let start = cookieData.indexOf(cName);
    let cValue = '';
    if(start !== -1){
        start += cName.length;
        let end = cookieData.indexOf(';', start);
        if (end === -1) {
            end = cookieData.length;
        }
        cValue = cookieData.substring(start, end);
    }
    return cValue;
}

export function deleteCookie(cName) {
    setCookie(cName, '', -1);
}