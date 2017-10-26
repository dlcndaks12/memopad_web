import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logout } from 'actions/authentication';
import { toast } from 'actions/toast';
import { confirmOpen } from 'actions/confirm';
import { SideNavigation } from "components";
import { deleteCookie } from 'js/util';

class Header extends Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        this.props.confirmOpen('정말 로그아웃 하시게요?', (result) => {
          if (result) {
            deleteCookie('Authentication');

            this.props.logout();
            this.props.toast('로그아웃 되었습니다.');
            // this.props.history.push('/login');
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
                <div className="nav-wrapper red lighten-3 z-depth-2">
                    <Link to="/" className="brand-logo center">
                        <img src={require('resources/images/common/logo.svg')}  alt=""/>
                    </Link>
                    <ul className="right">
                        {/*<li>
                            <Link to="/write">
                                <i className="material-icons">mode_edit</i>
                            </Link>
                        </li>*/}
                        { this.props.status.isLoggedIn !== null ? this.props.status.isLoggedIn ? logoutButton : loginButton : '' }
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
    status: state.authentication.status,
    progress: state.progress,
});
const mapDispatchToProps = (dispatch) => ({
    toast: (content, time) => dispatch(toast(content, time)),
    confirmOpen: (content, callback) => dispatch((confirmOpen(content, callback))),
    logout: () => dispatch(logout()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
