import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUp } from 'modules/authentication';
import { toast } from 'modules/toast';
import { Link } from 'react-router-dom';
import { CircleLoader, Sakura } from 'components';
import './Auth.scss';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            idValidation: null,
            nicknameValidation: null,
            passwordValidation: null,
            passwordConfirmValidation: null,
            id: '',
            nickname: '',
            password: '',
            passwordConfirm: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        let nextState = {};
        nextState[name] = value;
        this.setState(nextState, () => {
            const idReg=/([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            const nicknameReg = /^[A-Za-z0-9]{4,12}$/;

            switch (name) {
                case 'id' :
                    if (this.state.id && idReg.test(this.state.id)) {
                        this.setState({idValidation: true});
                    } else {
                        this.setState({idValidation: false});
                    }
                    break;
                case 'nickname' :
                    if (this.state.nickname && nicknameReg.test(this.state.nickname)) {
                        this.setState({nicknameValidation: true});
                    } else {
                        this.setState({nicknameValidation: false});
                    }
                    break;
                case 'password' :
                    if (this.state.password && this.state.password.length > 7 && this.state.password.length < 21) {
                        this.setState({passwordValidation: true});
                    } else {
                        this.setState({passwordValidation: false});
                    }
                    break;
                case 'passwordConfirm' :
                    if (this.state.passwordConfirm === this.state.password) {
                        this.setState({passwordConfirmValidation: true});
                    } else {
                        this.setState({passwordConfirmValidation: false});
                    }
                    break;
                default : break;
            }
        });
    }

    handleRegister() {
        const id = this.state.id;
        const nickname = this.state.nickname;
        const password = this.state.password;

        if (!this.state.idValidation) {
            this.props.toast('아이디(이메일)를 확인해주세요.');
            this.setState({idValidation: false});
            return false;
        }
        if (!this.state.nicknameValidation) {
            this.props.toast('닉네임을 확인해주세요.');
            this.setState({nicknameValidation: false});
            return false;
        }
        if (!this.state.passwordValidation) {
            this.props.toast('비밀번호를 확인해주세요.');
            this.setState({passwordValidation: false});
            return false;
        }
        if (!this.state.passwordConfirmValidation) {
            this.props.toast('비밀번호를 다시한번 입력해주세요.');
            this.setState({passwordConfirmValidation: false});
            return false;
        }

        this.props.signUp(id, nickname, password).then(
            () => {
                if(this.props.success['authentication/SIGN_UP']) {
                    this.props.toast(this.props.message);
                    this.props.history.push('/login');
                } else {
                    this.props.toast(this.props.message);
                }
            }
        );
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
                <Sakura />
                <div className="container auth">
                    <Link className="logo blue-text text-lighten-2" to="/">Trip Book</Link>
                    <div className="card">
                        <div className="header light-blue darken-1 white-text center">
                            <div className="card-content">회원가입</div>
                        </div>
                        <div className="card-content">
                            <div className="reg-input-wrap">
                                <div className="input-field s12 id">
                                    <input
                                        name="id"
                                        type="text"
                                        className="validate"
                                        value={this.state.id}
                                        onChange={this.handleChange}
                                    />
                                    <label>이메일</label>
                                    <div className={`guide ${this.state.idValidation !== null ? !this.state.idValidation ? 'error' : 'ok' : ''}`}>
                                        이메일형식으로 입력해주세요.
                                    </div>
                                </div>
                                <div className="input-field s12 id">
                                    <input
                                        name="nickname"
                                        type="text"
                                        className="validate"
                                        value={this.state.nickname}
                                        onChange={this.handleChange}
                                    />
                                    <label>닉네임</label>
                                    <div className={`guide ${this.state.nicknameValidation !== null ? !this.state.nicknameValidation ? 'error' : 'ok' : ''}`}>
                                        4~12자 영문자 또는 숫자로 입력해주세요.
                                    </div>
                                </div>
                                <div className="input-field s12">
                                    <input
                                        name="password"
                                        type="password"
                                        className="validate"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                    />
                                    <label>비밀번호</label>
                                    <div className={`guide ${this.state.passwordValidation !== null ? !this.state.passwordValidation ? 'error' : 'ok' : ''}`}>
                                        8~20자로 입력해주세요.
                                    </div>
                                </div>
                                <div className="input-field s12">
                                    <input
                                        name="passwordConfirm"
                                        type="password"
                                        className="validate"
                                        value={this.state.passwordConfirm}
                                        onChange={this.handleChange}
                                    />
                                    <label>비밀번호 확인</label>
                                    <div className={`guide ${this.state.passwordConfirmValidation !== null ? !this.state.passwordConfirmValidation ? 'error' : 'ok' : ''}`}>
                                        비밀번호를 한번더 입력해주세요.
                                    </div>
                                </div>
                            </div>
                            {this.props.pending['authentication/SIGN_UP'] ? waiting : <a onClick={this.handleRegister} className="waves-effect btn-large waves-light btn blue lighten-2">CREATE</a>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.authentication.auth,
    message: state.authentication.message,
    pending: state.pender.pending,
    success: state.pender.success,
});

const mapDispatchToProps = (dispatch) => ({
    signUp: (id, nickname, password) => dispatch(signUp(id, nickname, password)),
    toast: (content, time) => dispatch(toast(content, time))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
