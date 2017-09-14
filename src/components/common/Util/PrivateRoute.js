import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends Component {

    render() {

        return (
            <Route
                exact={this.props.exact}
                path={this.props.path}
                render={props => (
                    this.props.isLoggedIn ? (
                        <this.props.component {...props}/>
                    ) : (
                        <Redirect to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }}/>
                    )
                )}
            />
        );
    }
}

export default PrivateRoute;