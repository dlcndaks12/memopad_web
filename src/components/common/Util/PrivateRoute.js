import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends Component {

    render() {
        let isLoggedIn = this.props.auth.isLoggedIn;
        return (
            <Route
                exact={this.props.exact}
                path={this.props.path}
                render={props => (
                    isLoggedIn === null || isLoggedIn ? (
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

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(PrivateRoute);