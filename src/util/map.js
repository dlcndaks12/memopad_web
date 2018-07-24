const naver = window.naver;

export function searchCoordinateToAddress(latlng) {
    const coord = new naver.maps.LatLng(latlng.lat, latlng.lng);
    const tm128 = naver.maps.TransCoord.fromLatLngToTM128(coord);

    naver.maps.Service.reverseGeocode({
        location: tm128,
        coordType: naver.maps.Service.CoordType.TM128
    }, function(status, response) {
        if (status === naver.maps.Service.Status.ERROR) {
            return alert('Something Wrong!');
        }

        const items = response.result.items;
        const address = [];

        for (let i = 0, ii = items.length, item; i < ii && i < 2; i++) {
            item = items[i];
            // addrType = item.isRoadAddress ? '[도로명 주소]' : '[지번 주소]';
            // address.push(addrType +' '+ item.address);
            address.push(item.address);
        }

        return address;
    });
}
