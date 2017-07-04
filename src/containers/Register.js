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
        if(this.props.status === "SUCCESS") {
          this.props.toastOpen('Success! Please log in.', 3000);
          this.props.history.push('/');
          return true;
        } else {
          this.props.toastOpen(this.props.message, 3000);
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
          status={this.props.status}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  status: state.authentication.register.status,
  message: state.authentication.register.message,
});

const mapDispatchToProps = (dispatch) => ({
  registerRequest: (id, pw) => dispatch(registerRequest(id, pw)),
  toastOpen: (content, time) => dispatch(toastOpen(content, time))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
