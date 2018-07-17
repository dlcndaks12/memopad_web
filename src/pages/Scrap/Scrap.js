import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { PrivateRoute } from 'components';
import { ScrapWrite, ScrapList, ScrapDetail } from 'pages';
import './Scrap.scss';

class Scrap extends Component {
    render() {
        return (
            <Switch>
                <PrivateRoute path="/scrap/write" component={ScrapWrite}/>
                <Route path="/scrap/detail/:idx" component={ScrapDetail}/>
                <Route path="/scrap/:nation" component={ScrapList}/>
                <Route path="/scrap" component={ScrapList}/>
            </Switch>
        );
    }
}

export default Scrap;