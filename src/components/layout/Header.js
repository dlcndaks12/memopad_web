import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logout } from 'modules/auth';
import { toast } from 'modules/toast';
import { confirm } from 'modules/confirm';
import { SideNavigation } from "components";

class Header extends Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        this.props.confirm({
            message: '정말 로그아웃 하시게요?',
            callback: (result) => {
                if (result) {
                    this.props.logout();
                    this.props.toast('로그아웃 되었습니다.');
                    // this.props.history.push('/login');
                }
            }
        });
    }

    render() {
        const loginButton = (
            <li>
                <Link to="/login">
                    <i className="material-icons">vpn_key</i>
                </Link>
            </li>
        );
        const logoutButton = (
            <li>
                <a onClick={this.handleLogout}>
                    <i className="material-icons">lock_open</i>
                </a>
            </li>
        );

        return (
            <header>
                <div className="side-nav-wrap">
                    <SideNavigation location={this.props.location.pathname} />
                </div>
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo center">
                        <img src={require('resources/images/common/logo.png')}  alt=""/>
                        {/*tripl*/}
                    </Link>
                    <ul className="right">
                        {/*<li>
                            <Link to="/write">
                                <i className="material-icons">mode_edit</i>
                            </Link>
                        </li>*/}
                        { this.props.auth.isLoggedIn !== null ? this.props.auth.isLoggedIn ? logoutButton : loginButton : '' }
                    </ul>
                    {this.props.progress.show ?
                        <div className="progress red lighten-4">
                            <div className="indeterminate red lighten-1"> </div>
                        </div> : ''
                    }
                </div>
            </header>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    progress: state.progress,
});
const mapDispatchToProps = (dispatch) => ({
    toast: (message, time) => dispatch(toast(message, time)),
    confirm: (message, callback) => dispatch((confirm(message, callback))),
    logout: () => dispatch(logout()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
