import React, { Component } from 'react';

class Home extends Component {
    componentDidMount() {
        this.props.history.replace('/scrap');
    }

    render() {
        return (
            <div>
              Home Page
            </div>
        );
    }
}

export default Home;