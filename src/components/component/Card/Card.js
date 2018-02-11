import React, { Component } from 'react';
import * as path from 'config/path';

class Card extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imagePending: true,
        }
    }

    componentDidMount() {
        const downloadingImage = new Image();
        downloadingImage.onload = () => {
            this.setState({
                imagePending: false,
            });
        };
        downloadingImage.src = `${path.apiUrl}/api/image?url=${this.props.item.imageUrl}`;
    }


    render() {
        const item = this.props.item;
        const imagePending = this.state.imagePending;
        const preloaderStyle = {
            backgroundImage: `url(${require('resources/images/common/preloader/ellipsis.svg')})`,
            backgroundSize: '50px',
            backgroundPosition: '50% 50%',
        };
        const thumbStyle = {
            backgroundImage: `url(${path.apiUrl}/api/image?url=${this.props.item.imageUrl})`,
        };

        return (
            <div className="card-wrap">
                <div className="card">
                    <div className="card-image" style={imagePending ? preloaderStyle : thumbStyle}>
                        <span className="card-title" title="Card Title">{item.title}</span>
                    </div>
                    <div className="card-content">
                        <p className="desc">
                            {item.description}
                        </p>
                        <div className="card-date">{item.regDate}</div>
                    </div>
                    <div className="card-action">
                        <span className="author">{item.writer}</span>
                        <a href={item.url} target="_blank" className="btn-link">
                            <i className="small red-text text-lighten-3 material-icons">open_in_new</i>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;