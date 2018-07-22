import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

const GoogleAPIMap = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={props.defaultZoom}
        defaultCenter={{lat: props.defaultCenter.lat, lng: props.defaultCenter.lng}}>
        <Marker position={{lat: props.defaultCenter.lat, lng: props.defaultCenter.lng}}>
            <InfoWindow>
                <div>{props.title}</div>
            </InfoWindow>
        </Marker>
    </GoogleMap>
));

export default GoogleAPIMap;