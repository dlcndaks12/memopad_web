import React, {Component} from 'react';
import { connect } from 'react-redux';
import { loginRequest } from 'actions/authentication';
import { toastOpen } from 'actions/toast';
import { Link } from 'react-router-dom';
import { CircleLoader } from 'components';

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

    handleKeyPress(e) {
        if(e.charCode === 13) {
            if(this.props.mode) {
                this.handleLogin();
            } else {
                this.handleRegister();
            }
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
            this.props.toastOpen('ID를 입력해주세요.', 3000);
            return false;
        }

        if(pw === '') {
            this.props.toastOpen('비밀번호를 입력해주세요.', 3000);
            return false;
        }

        this.props.loginRequest(id, pw).then(
            () => {
                if(this.props.login.status === 'SUCCESS') {
                    this.props.toastOpen(`${id}님 환영합니다.`, 3000);
                    this.props.history.push('/');
                } else {
                    this.props.toastOpen(this.props.login.message, 2000);
                    this.setState({
                        password: ''
                    });
                }
            }
        )
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

                <div className="container auth">
                    <Link className="logo blue-text text-lighten-2" to="/">Nolja</Link>
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
                                {this.props.login.status === 'WAITING' ? waiting : <a onClick={this.handleLogin} className="waves-effect btn-large waves-light btn blue lighten-2">LOGIN</a>}
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
    login: state.authentication.login
});

const mapDispatchToProps = (dispatch) => ({
    loginRequest: (id, pw) => dispatch(loginRequest(id, pw)),
    toastOpen: (content, time) => dispatch(toastOpen(content, time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

