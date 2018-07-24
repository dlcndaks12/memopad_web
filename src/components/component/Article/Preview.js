import React, { Component } from 'react';
import * as path from 'config/path';
import { GOOGLE_KEY } from 'config/key';
import { ImageLoader, GoogleMap, NaverMap, Input, Textarea } from 'components';

class Preview extends Component {
    shouldComponentUpdate(nextProps) {
        return JSON.stringify(this.props.og) !== JSON.stringify(nextProps.og);
    }

    render() {
        const nationCode = this.props.nationCode;
        const og = this.props.og;
        const map = og.map;
        const imageUrl = og.ogImageUrl ? og.ogImageUrl.replace(/%/gi, '%25') : null;

        return (
            <div className="preview-area">
                {imageUrl ?
                    <div className="thumb">
                        <ImageLoader image={`${path.apiUrl}/api/image?url=${imageUrl}`}/>
                    </div>
                    : null}
                <div className="title">
                    <div className="input-field title">
                        <Input id="og-title"
                               name="og-title"
                               value={og.ogTitle}
                               placeholder="Title"
                               onChange={this.props.onChange}/>
                    </div>
                </div>
                <div className="description">
                    <div className="input-field">
                        <Textarea id="og-description"
                                  name="og-description"
                                  className="materialize-textarea"
                                  value={this.props.og.ogDescription}
                                  placeholder="Description"
                                  onChange={this.props.onChange}/>
                    </div>
                </div>
                {map ?
                    <div className="location-area">
                        <div>{map.address}</div>
                        <div>{map.addressRoad}</div>
                        <div className="map">
                            {nationCode === 'kr' ?
                                <NaverMap id="scrap-detail-map"
                                          defaultCenter={{lat: parseFloat(map.latitude), lng: parseFloat(map.longitude)}}/>
                              : <GoogleMap googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                                       loadingElement={<div style={{ height: '100%' }} />}
                                       containerElement={<div style={{ height: '100%' }} />}
                                       mapElement={<div style={{ height: '100%' }} />}
                                       title={map.title}
                                       defaultZoom={15}
                                       defaultCenter={{lat: parseFloat(map.latitude), lng: parseFloat(map.longitude)}}/>}
                        </div>
                    </div>
                    : undefined}
            </div>
        );
    }
}

export default Preview;
