import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Authentication } from '../components';
import { connect } from 'react-redux';
import { loginRequest } from '../actions/authentication';

class Login extends Component {
  render() {
    return (
      <div>
        <Authentication
          mode={true}
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

