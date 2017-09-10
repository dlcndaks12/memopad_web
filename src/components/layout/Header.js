import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { toastOpen } from '../../actions/toast';

class Header extends Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        localStorage.removeItem('_key');
        sessionStorage.removeItem('_key');

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
              <div className="nav-wrapper blue darken-1">
                <Link to="/" className="brand-logo center">MEMO' S</Link>

                <ul>
                  <li><a><i className="material-icons">search</i></a></li>
                </ul>

                <div className="right">
                  <ul>
                      { this.props.isLoggedIn ? logoutButton : loginButton }
                  </ul>
                </div>
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

const mapDispatchToProps = (dispatch) => ({
    toastOpen: (content, time) => dispatch(toastOpen(content, time)),
});

export default withRouter(connect(null, mapDispatchToProps)(Header));
