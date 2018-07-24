const naver = window.naver;

export function searchCoordinateToAddress(latlng) {
    const coord = new naver.maps.LatLng(latlng.lat, latlng.lng);
    const tm128 = naver.maps.TransCoord.fromLatLngToTM128(coord);

    return new Promise((resolve, reject) => {
        naver.maps.Service.reverseGeocode({
            location: tm128,
            coordType: naver.maps.Service.CoordType.TM128
        }, (status, response) => {
            if (status === naver.maps.Service.Status.ERROR) {
                alert('Something Wrong!');
                reject();
            }

            const items = response.result.items;
            const address = [];

            for (let i = 0, ii = items.length, item; i < ii && i < 2; i++) {
                item = items[i];
                // addrType = item.isRoadAddress ? '[도로명 주소]' : '[지번 주소]';
                // address.push(addrType +' '+ item.address);
                address.push(item.address);
            }

            resolve(address);
        });
    });

}
