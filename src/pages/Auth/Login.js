import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from 'modules/auth';
import { toast } from 'modules/toast';
import { Link } from 'react-router-dom';
import { CircleLoader, Input, Button } from 'components';
import './Auth.scss';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            validation: false,
            validationMessage: '',
            id: '',
            password: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isLoggedIn) {
            // this.props.history.replace('/');
        }
    }

    handleKeyPress(e) {
        if(e.charCode === 13) {
            this.handleLogin();
        }
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleLogin() {
        const id = this.state.id;
        const pw = this.state.password;

        if(id === '') {
            this.props.toast('ID를 입력해주세요.');
            return false;
        }

        if(pw === '') {
            this.props.toast('비밀번호를 입력해주세요.');
            return false;
        }

        this.props.login(id, pw)
            .then(() => {
                if(this.props.auth.isLoggedIn) {
                    this.props.toast(`${this.props.auth.nickname}님 환영합니다.`);
                    this.props.history.push('/');
                }
            })
            .catch((error) => {
                this.props.toast(error.message);
                this.setState({
                    password: ''
                });
            });
    }

    render() {
        const waiting = (
            <a className="btn expanded">
                <span className="loader">
                    <CircleLoader size={30} color="white"/>
                </span>
            </a>
        );

        return (
            <div className="auth-page">
                <div className="container auth">
                    <Link className="logo" to="/">trip &amp; place</Link>
                    <div className="card">
                        <div className="card-content">
                            <div className="input-form">
                                <div className="input-field id">
                                    <Input name="id"
                                           type="text"
                                           value={this.state.id}
                                           placeholder="e-mail"
                                           onChange={this.handleChange}/>
                                </div>
                                <div className="input-field">
                                    <Input name="password"
                                           type="password"
                                           value={this.state.password}
                                           placeholder="password"
                                           onChange={this.handleChange}
                                           onKeyPress={this.handleKeyPress}/>
                                </div>
                            </div>
                            {this.props.pending['auth/LOGIN'] ? waiting : <Button onClick={this.handleLogin} value="로그인"/>}
                        </div>
                        <div className="form-footer">
                            처음이세요? <Link to="/register"><span>회원가입</span></Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    pending: state.pender.pending,
});

const mapDispatchToProps = (dispatch) => ({
    login: (id, pw) => dispatch(login(id, pw)),
    toast: (payload) => dispatch(toast(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

