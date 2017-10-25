import React, {Component} from 'react';
import { connect } from 'react-redux';
import { registerRequest } from '../../actions/authentication';
import { toastOpen } from '../../actions/toast';
import { Link } from 'react-router-dom';
import { CircleLoader } from 'components';

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
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState, () => {
            const idReg=/([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            const nicknameReg = /^[A-Za-z0-9]{4,12}$/;
            if (!(this.state.id !== '' && this.state.id !== 'undefined' && idReg.test(this.state.id))) {
                this.setState({
                    idValidation: false,
                });
            } else {
                this.setState({
                    idValidation: true,
                });
            }
            if (!idReg.test(this.state.id)) {
            }
        });
    }

    handleRegister() {
        const id = this.state.id;
        const pw = this.state.password;

        if(id === '') {
            this.props.toastOpen('아이디를 입력해주세요.', 2000);
            return false;
        }
        if(pw === '') {
            this.props.toastOpen('비밀번호를 입력해주세요.', 2000);
            return false;
        }

        this.props.registerRequest(id, pw).then(
            () => {
                if(this.props.register.status === "SUCCESS") {
                    this.props.toastOpen(this.props.register.message, 2000);
                    this.props.history.push('/login');
                } else {
                    this.props.toastOpen(this.props.register.message, 2000);
                    this.setState({
                        id: '',
                        password: '',
                    })
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
                <div className="container auth">
                    <Link className="logo blue-text text-lighten-2" to="/">Nolja</Link>
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
                            {this.props.register.status === 'WAITING' ? waiting : <a onClick={this.handleRegister} className="waves-effect btn-large waves-light btn blue lighten-2">CREATE</a>}
                        </div>
                    </div>
                </div>
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
