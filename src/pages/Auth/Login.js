import React, {Component} from 'react';
import { Authentication } from '../../components/index';
import { connect } from 'react-redux';
import { loginRequest } from '../../actions/authentication';
import { toastOpen } from '../../actions/toast';

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(id, pw) {
        return this.props.loginRequest(id, pw).then(
            () => {
                if(this.props.login.status === 'SUCCESS') {
                    this.props.toastOpen(`${id}님 환영합니다.`, 3000);
                    this.props.history.push('/');
                    return true;
                } else {
                    this.props.toastOpen(this.props.login.message, 2000);
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
                    onLogin={this.handleLogin}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    login: state.authentication.login
});

const mapDispatchToProps = (dispatch) => ({
    loginRequest: (id, pw) => dispatch(loginRequest(id, pw)),
    toastOpen: (content, time) => dispatch(toastOpen(content, time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
