import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { sideNavOpen, sideNavClose } from 'modules/sideNav';

class Header extends Component {
    constructor(props) {
        super(props);

        this.handleSideNav = this.handleSideNav.bind(this);
    }

    handleSideNav() {
        if (!this.props.sideNav.isOpen) {
            this.props.sideNavOpen();
        } else {
            this.props.sideNavClose();
        }
    }

    render() {
        const nickname = this.props.auth.nickname;

        const loggedIn = (
            <li>
                <Link to="/login">
                    <i className="fas fa-sign-in-alt"/>
                </Link>
            </li>
        );
        const loggedOut = (
            <li>
                <Link to={`/${nickname}`}>
                    <i className="fas fa-user"/>
                </Link>
            </li>
        );

        return (
            <header>
                <div className="nav-wrapper">
                    <div className="side-nav-wrap">
                        <a className="nav-trigger" onClick={this.handleSideNav}>
                            <span className="txt">menu</span>
                            <span className="lines">
                                <span className="line1"/>
                                <span className="line2"/>
                                <span className="line3"/>
                            </span>
                        </a>
                    </div>
                    <h1><Link to="/" className="logo center">trip &amp; place</Link></h1>
                    <ul className="util-btn-group">
                        { this.props.auth.isLoggedIn !== null ? this.props.auth.isLoggedIn ? loggedOut : loggedIn : '' }
                    </ul>
                </div>
            </header>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    sideNav: state.sideNav,
    progress: state.progress,
});

const mapDispatchToProps = (dispatch) => ({
    sideNavOpen: () => dispatch(sideNavOpen()),
    sideNavClose: () => dispatch(sideNavClose()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
