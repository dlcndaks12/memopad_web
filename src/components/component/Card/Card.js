import React, {Component} from 'react';

class Card extends Component {
    render() {
        return (
            <div className="card-wrap">
                {/*<div className="card">
                    <div className="card-image">
                        <img src={require('resources/images/sample.jpg')}  alt=""/>
                        <span className="card-title">Card Title</span>
                    </div>
                    <div className="card-content">
                        <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
                    </div>
                </div>*/}
                <div className="card">
                    <div className="card-image">
                        <img src={require('resources/images/sample.jpg')}  alt=""/>
                    </div>
                    <div className="card-content">
                        <span className="card-title" title="Card Title">Card Title</span>
                        <p title="I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.">
                            I am a very simple card. I am good at containing small bits of information.
                            I am convenient because I require little markup to use effectively.
                        </p>
                    </div>
                    <div className="card-action">
                        <a href="#!" className="btn-link">
                            <i className="small orange-text text-darken-3 material-icons">link</i>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;