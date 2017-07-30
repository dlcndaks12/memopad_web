import React, {Component} from 'react';
import { Authentication } from '../components';
import { connect } from 'react-redux';
import { registerRequest } from '../actions/authentication';
import { toastOpen } from '../actions/toast';

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleRegister(id, pw) {
    return this.props.registerRequest(id, pw).then(
      () => {
        if(this.props.register.status === "SUCCESS") {
          this.props.toastOpen('가입이 완료되었습니다. 로그인 해주세요.', 2000);
          this.props.history.push('/login');
          return true;
        } else {
          if(this.props.register.error.status === 409) {
            this.props.toastOpen("이미 가입된 username입니다.", 2000);
          }
          return false;
        }
      }
    );
  }

  render() {
    return (
      <div>
        <Authentication
          mode={false}
          onRegister={this.handleRegister}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  register: state.authentication.register,
});

const mapDispatchToProps = (dispatch) => ({
  registerRequest: (id, pw) => dispatch(registerRequest(id, pw)),
  toastOpen: (content, time) => dispatch(toastOpen(content, time))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
