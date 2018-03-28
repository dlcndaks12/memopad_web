import React, { Component } from 'react';
import MapModal from './MapModal/MapModal';

class Modal extends Component {
    render() {
        return (
            <div className="modals" id="modals">
                <MapModal />
            </div>
        );
    }
}

export default Modal;
