import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { toast } from 'modules/toast';
import { confirm } from 'modules/confirm';
import { logout } from 'modules/auth';
import { sideNavOpen, sideNavClose } from 'modules/sideNav';

class SideNavigation extends Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
        this.handleSideNav = this.handleSideNav.bind(this);
    }

    handleLogout() {
        this.props.confirm({
            message: '정말 로그아웃 하시게요?',
            callback: (result) => {
                if (result) {
                    this.props.logout();
                    this.props.toast('로그아웃 되었습니다.');
                    this.props.history.push('/login');
                }
            }
        });
    }

    handleSideNav() {
        if (!this.props.sideNav.isOpen) {
            this.props.sideNavOpen();
        } else {
            this.props.sideNavClose();
        }
    }

    render() {
        const isOpened = this.props.sideNav.isOpen;

        return (
            <div className={`side-navigation ${isOpened ? 'active' : ''}`}>
                <div className="nav-mask" onClick={this.handleSideNav}/>
                <div className="nav-cont" onClick={this.handleSideNav}>
                    <a className="close-trigger">close</a>
                    <nav>
                        <ul>
                            <li>
                                <NavLink to="/scrap" activeClassName="active" onClick={this.handleSideNav}>
                                    <i className="fas fa-bookmark"/><span>스크랩</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/review" activeClassName="active" onClick={this.handleSideNav}>
                                    <i className="fas fa-shoe-prints"/><span>발자국</span>
                                </NavLink>
                            </li>
                        </ul>
                        {this.props.auth.isLoggedIn ?
                            <div className="logout">
                                <a onClick={this.handleLogout}>
                                    <i className="fas fa-lock"/>
                                    <span>로그아웃</span>
                                </a>
                            </div> : undefined}
                    </nav>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    sideNav: state.sideNav,
});

const mapDispatchToProps = (dispatch) => ({
    sideNavOpen: () => dispatch(sideNavOpen()),
    sideNavClose: () => dispatch(sideNavClose()),
    toast: (message, time) => dispatch(toast(message, time)),
    confirm: (message, callback) => dispatch((confirm(message, callback))),
    logout: () => dispatch(logout()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideNavigation));