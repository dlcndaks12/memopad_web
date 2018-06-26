import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { sideNavOpen, sideNavClose } from 'modules/sideNav';

class SideNavigation extends Component {
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
        const isOpened = this.props.sideNav.isOpen;

        return (
            <div className={`side-navigation ${isOpened ? 'active' : ''}`}>
                <a className="nav-trigger" onClick={this.handleSideNav}>
                    <span className="txt">menu</span>
                    <span className="lines">
                        <span className="line1"/>
                        <span className="line2"/>
                        <span className="line3"/>
                    </span>
                </a>
                <nav className="nav-cont">
                    <a className="close-trigger">close</a>
                    <ul>
                        <li>
                            <NavLink to="/scrap" activeClassName="active">
                                <i className="fas fa-bookmark"/><span>스크랩</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/review" activeClassName="active">
                                <i className="fas fa-marker"/><span>후기</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(SideNavigation);