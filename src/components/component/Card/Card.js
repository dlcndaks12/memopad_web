import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        const imageUrl = this.props.item.imageUrl.replace(/%/gi, '%25');
        downloadingImage.onload = () => {
            this.setState({
                imagePending: false,
            });
        };
        downloadingImage.src = `${path.apiUrl}/api/image?url=${imageUrl}`;
    }

    render() {
        const item = this.props.item;
        const imageURl = item.imageUrl.replace(/%/gi, '%25');
        const imagePending = this.state.imagePending;
        const preloaderStyle = {
            backgroundImage: `url(${require('resources/images/common/preloader/ellipsis.svg')})`,
            backgroundSize: '50px',
            backgroundPosition: '50% 50%',
        };
        const thumbStyle = {
            backgroundImage: `url(${path.apiUrl}/api/image?url=${imageURl})`,
        };

        return (
            <div className="card-wrap">
                {/*<div className="card">*/}
                <div className="card">
                    {imagePending ?
                        <a href={item.url} target="_blank" className="card-image" style={preloaderStyle} title={item.title}>
                            <span className="card-title">{item.title}</span>
                        </a>
                        :
                        <a href={item.url} target="_blank" className="card-image done" style={thumbStyle} title={item.title}>
                            <span className="card-title">{item.title}</span>
                        </a>
                    }
                    <div className="card-content">
                        <p className="desc">
                            {item.description}
                        </p>
                        {/*<div className="card-date">{item.regDate}</div>*/}
                        <Link to={`/${item.writer}`} className="author"><em>{item.writer}</em>'s pick</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;