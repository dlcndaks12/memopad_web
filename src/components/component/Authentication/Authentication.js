import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CircleLoader } from 'components';
import { toastOpen } from 'actions/toast';

class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validation: false,
            validationMessage: '',
            id: '',
            password: '',
            passwordConfirm: '',
        };

        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
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

        this.props.onLogin(id, pw).then(
            (success) => {
                if(!success) {
                    this.setState({
                        password: ''
                    });
                }
            }
        );
    }

    handleRegister() {
        const id = this.state.id;
        const pw = this.state.password;
        const idReg = /^[A-Za-z0-9]{4,12}$/;
        if (!idReg.test(this.state.id)) {
            this.props.toastOpen("아이디는 영문자로 시작하는 4~12자 영문자 또는 숫자여야 합니다.", 2000);
            return false;
        }

        if(id === '') {
            this.props.toastOpen('아이디를 입력해주세요.', 2000);
            return false;
        }

        if(pw === '') {
            this.props.toastOpen('비밀번호를 입력해주세요.', 2000);
            return false;
        }

        this.props.onRegister(id, pw).then(
            (result) => {
                if(!result) {
                    this.setState({
                        id: '',
                        password: '',
                    })
                }
            }
        )
    }

    render() {
        const waiting = (
            <a className="waves-effect btn-large waves-light btn blue-grey lighten-1">
                <span className="loader">
                    <CircleLoader/>
                </span>
            </a>
        );

        const inputBoxes = (
            <div>
              <div className="input-field s12 id">
                <input
                    name="id"
                    type="text"
                    className="validate"
                    value={this.state.id}
                    onChange={this.handleChange}
                />
                <label>아이디</label>
                <div className="guide">영문자로 시작하는 4~12자 영문자 또는 숫자</div>
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
        );

        const loginView = (
            <div>
              <div className="card-content">
                <div className="row">
                    {inputBoxes}
                    {this.props.login.status === 'WAITING' ? waiting : <a onClick={this.handleLogin} className="waves-effect btn-large waves-light btn blue-grey lighten-1">LOGIN</a>}
                </div>
              </div>
              <div className="footer">
                <div className="card-content">
                  <div className="right" >
                    처음이세요? <Link to="/register"><span className="blue-grey-text text-lighten-1">회원가입</span></Link>
                  </div>
                </div>
              </div>
            </div>
        );

        const registerView = (
            <div className="card-content">
              <div className="row">
                  {inputBoxes}
                  {this.props.register.status === 'WAITING' ? waiting : <a onClick={this.handleRegister} className="waves-effect btn-large waves-light btn blue-grey lighten-1">CREATE</a>}
              </div>
            </div>
        );

        return (
            <div className="container auth">
              <Link className="logo" to="/">Nolja</Link>
              <div className="card">
                <div className="header blue-grey darken-3 white-text center">
                  <div className="card-content">{this.props.mode ? "로그인" : "회원가입"}</div>
                </div>
                  {this.props.mode ? loginView : registerView }
              </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    login: state.authentication.login,
    register: state.authentication.register,
});
const mapDispatchToProps = (dispatch) => ({
    toastOpen: (content, time) => dispatch(toastOpen(content, time))
});

Authentication.propTypes = {
    mode: PropTypes.bool,
    onLogin: PropTypes.func,
    onLoRegister: PropTypes.func
};
Authentication.defaultProps = {
    mode: true,
    onLogin: (id, pw) => { console.error("login function not defined"); },
    onRegister: (id, pw) => { console.error("register function not defined"); }
};

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
