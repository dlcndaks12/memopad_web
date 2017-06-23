import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Authentication } from '../components';
import { connect } from 'react-redux';
import { loginRequest } from '../actions/authentication';
import { toastOpen } from '../actions/toast';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(id, pw) {
    return this.props.loginRequest(id, pw).then(
        () => {
          console.log('handleLogin . then : ' + this.props.status);

          if(this.props.status === 'SUCCESS') {
            let loginData = {
              isLoggedIn: true,
              username: id
            };

            document.cookie = 'key=' + btoa(JSON.stringify(loginData));

            this.props.toastOpen('Success', 1500);
            this.props.history.push('/');
            return true;
          } else {
            this.props.toastOpen('Fail', 1500);
            return false;
          }
        }
    )
  }

  render() {
    return (
      <div>
        <Authentication
          mode={true}
          handleLogin={this.handleLogin}
          status={this.props.status}
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
    },
    toastOpen: (content, time) => {
      return dispatch(toastOpen(content, time));
    }
  };
};

Login.propTypes = {};
Login.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

