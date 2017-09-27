import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends Component {

    render() {
        return (
            <Route
                exact={this.props.exact}
                path={this.props.path}
                render={props => (
                    this.props.status.isLoggedIn ? (
                        <this.props.component {...props}/>
                    ) : (
                        <Redirect to={{
                            pathname: '/',
                            state: { from: props.location }
                        }}/>
                    )
                )}
            />
        );
    }
}

const mapStateToProps = (state) => ({
  status: state.authentication.status,
});

export default connect(mapStateToProps, null)(PrivateRoute);