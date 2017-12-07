import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { toast } from 'modules/toast';

class PrivateRoute extends Component {

    render() {
        let isLoggedIn = this.props.auth.isLoggedIn;
        return (
            <Route
                exact={this.props.exact}
                path={this.props.path}
                render={(props) => {
                    let component;
                    if (isLoggedIn === null || isLoggedIn) {
                        component = <this.props.component {...props}/>;
                    } else {
                        this.props.toast('로그인 해주세요.');
                        component = <Redirect to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }}/>;
                    }
                    return component;
                }}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
    toast: (content, time) => dispatch(toast(content, time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);