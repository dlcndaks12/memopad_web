import React, {Component} from 'react';
import { Authentication } from '../../components/index';
import { connect } from 'react-redux';
import { registerRequest } from '../../actions/authentication';
import { toastOpen } from '../../actions/toast';

class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleRegister(id, pw) {
        return this.props.registerRequest(id, pw).then(
            () => {
                if(this.props.register.status === "SUCCESS") {
                    this.props.toastOpen(this.props.register.message, 2000);
                    this.props.history.push('/login');
                    return true;
                } else {
                    this.props.toastOpen(this.props.register.message, 2000);
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
