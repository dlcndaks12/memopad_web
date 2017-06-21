import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Authentication } from '../components';
import { connect } from 'react-redux';
import { loginRequest } from '../actions/authentication';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(id, pw) {
    return this.props.loginRequest(id, pw).then(
        () => {
          console.log(this.props.status);
        }
    )
  }

  render() {
    return (
      <div>
        <Authentication
          mode={true}
          handleLogin={this.handleLogin}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.authentication.login.status
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: (id, pw) => {
      return dispatch(loginRequest(id,pw));
    }
  };
};

Login.propTypes = {};
Login.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

