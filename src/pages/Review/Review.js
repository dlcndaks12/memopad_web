import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { PrivateRoute } from 'components';
import { ReviewWrite, ReviewList } from 'pages';
// import './Review.scss';

class Review extends Component {
    render() {
        return (
            <Switch>
                <PrivateRoute path="/review/write" component={ReviewWrite}/>
                <Route path="/review/:nation" component={ReviewList}/>
                <Route path="/review" component={ReviewList}/>
            </Switch>
        );
    }
}

export default Review;