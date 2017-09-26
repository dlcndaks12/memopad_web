import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { toastOpen } from '../../actions/toast';
import { SideNavigation } from "components";
import { deleteCookie } from 'js/util';

class Header extends Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        deleteCookie('Authentication');

        this.props.toastOpen('로그아웃 되었습니다.', 2000);
        this.props.history.push('/login');
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
            <nav>
                <div className="side-nav-wrap">
                    <SideNavigation/>
                </div>
                <div className="nav-wrapper blue-grey darken-3">
                    {/*<Link to="/" className="brand-logo center">Life is OneShot</Link>*/}
                    <Link to="/" className="brand-logo center">
                        <img src={require('resources/images/common/logo.png')}  alt=""/>
                    </Link>
                    <ul className="left">
                       {/* <li>
                            <SideNavigation/>
                        </li>*/}
                        {/*<li><a><i className="material-icons">search</i></a></li>*/}
                    </ul>
                    <ul className="right">
                        {/*<li>
                            <Link to="/write">
                                <i className="material-icons">mode_edit</i>
                            </Link>
                        </li>*/}
                        { this.props.isLoggedIn ? logoutButton : loginButton }
                    </ul>
                    {this.props.progress.show ?
                        <div className="progress red lighten-4">
                            <div className="indeterminate red lighten-1"> </div>
                        </div> : ''
                    }
                </div>
            </nav>
        );
    }
}

Header.propTypes = {
    isLoggedIn: PropTypes.bool,
    onLogout: PropTypes.func
};
Header.defaultProps = {
    isLoggedIn: false,
    onLogout: () => { console.error('loogout function not defined'); }
};

const mapStateToProps = (state) => ({
    progress: state.progress,
});

const mapDispatchToProps = (dispatch) => ({
    toastOpen: (content, time) => dispatch(toastOpen(content, time)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
