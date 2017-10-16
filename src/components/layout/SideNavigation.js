import React, {Component} from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { SideNav } from 'react-materialize';

class SideNavigation extends Component {
    render() {
        const id = this.props.status.id !== '' ? this.props.status.id : '안녕하세요.';

        return (
            <SideNav
                trigger={<a><i className="material-icons">menu</i></a>}
                options={{ closeOnClick: true }}>

                <div className="my-area blue lighten-2">
                    <NavLink to="/mypage" className="name">{id}</NavLink>
                    <ul className="info-list">
                      <li title="내가 쓴 글 갯수">
                        <i className="tiny white-text material-icons">border_color</i><span>10</span>
                      </li>
                      <li title="내가 쓴 댓글 갯수">
                        <i className="tiny white-text material-icons">mode_comment</i><span>0</span>
                      </li>
                    </ul>
                </div>
                <li>
                  <NavLink to="/scrap" activeClassName="active">
                    <i className="small material-icons">folder_special</i><span>스크랩</span>
                  </NavLink>
                  <NavLink to="/recommend" activeClassName="active">
                    <i className="small material-icons">rate_review</i><span>후기</span>
                  </NavLink>
                </li>
            </SideNav>
        );
    }
}

const mapStateToProps = (state) => ({
    status: state.authentication.status,
});

export default connect(mapStateToProps, null)(SideNavigation);