import React, { Component } from 'react';

class ImageLoader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imagePending: true,
        };
    }

    componentWillUnmount() {
        this.ismounted = false;
    }

    componentDidMount() {
        this.ismounted = true;
        const downloadingImage = new Image();
        const imageUrl = this.props.image.replace(/%/gi, '%25');
        downloadingImage.onload = () => {
            if (this.ismounted) {
                this.setState({
                    imagePending: false,
                }, () => {
                    if (this.props.onLoad) {
                        this.props.onLoad(imageUrl);
                    }
                });
            }
        };
        downloadingImage.src = imageUrl;
    }


    render() {
        const image = this.props.image;
        const imagePending = this.state.imagePending;
        const backgroundType = this.props.background;
        const backgroundStyle = {
            backgroundImage: `url(${require('resources/images/common/preloader/ellipsis.svg')})`,
            backgroundSize: '50px',
            backgroundPosition: '50% 50%',
            backgroundRepeat: 'no-repeat'
        };

        return (
            <div className="image-wrap">
                {imagePending ?
                    <div className="image" style={backgroundStyle}/>
                    :
                    backgroundType ?
                        <div className="image done" style={{backgroundImage: `url(${image})`}}/>
                        :
                        <div className="image done">
                            <img src={image} alt=""/>
                        </div>
                }
            </div>
        );
    }
}

ImageLoader.defaultProps = {
    background: false,
};

export default ImageLoader;

