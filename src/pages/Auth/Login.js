import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from 'modules/auth';
import { toast } from 'modules/toast';
import { Link } from 'react-router-dom';
import { CircleLoader, Sakura } from 'components';
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
            <a className="waves-effect btn-large waves-light btn blue lighten-2">
                <span className="loader">
                    <CircleLoader/>
                </span>
            </a>
        );

        return (
            <div>
                {/*<Authentication*/}
                    {/*mode={true}*/}
                    {/*onLogin={this.handleLogin}*/}
                {/*/>*/}
                <Sakura />
                <div className="container auth">
                    <Link className="logo blue-text text-lighten-2" to="/">Tripl</Link>
                    <div className="card">
                        <div className="header light-blue darken-1 white-text center">
                            <div className="card-content">로그인</div>
                        </div>
                        <div>
                            <div className="card-content">
                                <div>
                                    <div className="input-field s12 id">
                                        <input
                                            name="id"
                                            type="text"
                                            className="validate"
                                            value={this.state.id}
                                            onChange={this.handleChange}
                                        />
                                        <label>이메일</label>
                                    </div>
                                    <div className="input-field s12">
                                        <input
                                            name="password"
                                            type="password"
                                            className="validate"
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                            onKeyPress={this.handleKeyPress}
                                        />
                                        <label>비밀번호</label>
                                    </div>
                                </div>
                                {this.props.pending['auth/LOGIN'] ? waiting : <a onClick={this.handleLogin} className="waves-effect btn-large waves-light btn blue lighten-2">LOGIN</a>}
                            </div>
                            <div className="footer">
                                <div className="card-content">
                                    <div className="right" >
                                        처음이세요? <Link to="/register"><span className="blue-grey-text text-lighten-1">회원가입</span></Link>
                                    </div>
                                </div>
                            </div>
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
    toast: (content, time) => dispatch(toast(content, time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

