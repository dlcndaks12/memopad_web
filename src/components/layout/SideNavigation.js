import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import { SideNav, SideNavItem } from 'react-materialize';

class SideNavigation extends Component {
    render() {
        return (
            <SideNav
                trigger={<a><i className="material-icons">menu</i></a>}
                options={{ closeOnClick: true }}>
                <SideNavItem userView
                             user={{
                                 background: 'http://cfile28.uf.tistory.com/image/2137E439521346182E4C25',
                                 image: 'https://pbs.twimg.com/profile_images/535949276124172288/NcFxiF0v.jpeg',
                                 name: '개발새발',
                                 email: 'dlcndaks12@naver.com',
                             }}
                />
                {/*<SideNavItem href='#!icon' icon='cloud'>First Link With Icon</SideNavItem>
                <SideNavItem href='#!second'>Second Link</SideNavItem>*/}
                <li><a className="subheader">지역</a></li>
                <li>
                    <NavLink to="/" activeClassName="active">부산</NavLink>
                </li>
                <li>
                    <NavLink to="/" activeClassName="active">강원도</NavLink>
                </li>
                <li><div className="divider">&nbsp;</div></li>
                <li><a className="subheader">테마</a></li>
                <li>
                    <NavLink to="/" activeClassName="active">맛집</NavLink>
                </li>
                <li>
                    <NavLink to="/" activeClassName="active">숙소</NavLink>
                </li>
            </SideNav>
        );
    }
}

export default SideNavigation;