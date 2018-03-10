import React, { Component } from 'react';
import * as path from 'config/path';
import { GOOGLE_KEY } from 'config/key';
import { ImageLoader, Map } from 'components';

class Preview extends Component {

    shouldComponentUpdate(nextProps) {
        return JSON.stringify(this.props.og) !== JSON.stringify(nextProps.og);
    }

    render() {
        const og = this.props.og;
        const imageUrl = og.ogImageUrl;

        return (
            <div className="preview-area">
                <div className="thumb">
                    <ImageLoader image={`${path.apiUrl}/api/image?url=${imageUrl}`}/>
                </div>
                <div className="title">
                    <div className="input-field title">
                        <input id="og-title"
                               name="og-title"
                               type="text"
                               value={this.props.og.ogTitle}
                               onChange={this.props.onChange} />
                        <label htmlFor="og-title" className="active">Title</label>
                    </div>
                </div>
                <div className="description">
                    <div className="input-field">
                        <textarea id="og-description"
                                  name="og-description"
                                  className="materialize-textarea"
                                  value={this.props.og.ogDescription}
                                  onChange={this.props.onChange} />
                        <label htmlFor="og-description" className="active">Description</label>
                    </div>
                </div>
                <div className="map">
                    {/*<GoogleMapReact bootstrapURLKeys={{ key: GOOGLE_KEY }}
                                    defaultCenter={{lat: parseFloat(og.map.latitude), lng: parseFloat(og.map.longitude)}}
                                    defaultZoom={15}>
                        <SimpleMarker lat={parseFloat(og.map.latitude)}
                                      lng={parseFloat(og.map.longitude)}/>
                    </GoogleMapReact>*/}
                    <Map googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                         loadingElement={<div style={{ height: '100%' }} />}
                         containerElement={<div style={{ height: '100%' }} />}
                         mapElement={<div style={{ height: '100%' }} />}
                         title={og.map.title}
                         defaultZoom={15}
                         defaultCenter={{lat: parseFloat(og.map.latitude), lng: parseFloat(og.map.longitude)}}/>
                </div>
            </div>
        );
    }
}

export default Preview;
