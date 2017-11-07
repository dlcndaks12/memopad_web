import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { SideNav } from 'react-materialize';
import { sideNavOpen, sideNavClose } from 'actions/component/sideNav';

class SideNavigation extends Component {
    constructor(props) {
        super(props);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleOpen() {
        this.props.sideNavOpen();
    }

    handleClose() {
        this.props.sideNavClose();
    }

    render() {
        // const id = this.props.status.id !== '' ? this.props.status.id : '안녕하세요.';
        return (
            <SideNav
                trigger={<a><i className="material-icons">menu</i></a>}
                options={{
                  closeOnClick: true,
                  onOpen: this.handleOpen,
                  onClose: this.handleClose,
                }}>
                {this.props.status.isLoggedIn ?
                  <li className="my-area blue lighten-2">
                    {/*<Link to="/mypage" className="name">{this.props.status.id}</Link>*/}

                    <Link to="/mypage" className="name">{this.props.status.nickname}</Link>
                    <ul className="info-list">
                      <li>
                        <span>3241</span>개의 스크랩을 하셨어요!
                        {/*<i className="tiny white-text material-icons">border_color</i><span>10</span>*/}
                      </li>
                      <li>
                        <span>3241</span>개의 리뷰를 작성하셨어요!
                        {/*<i className="tiny white-text material-icons">mode_comment</i><span>0</span>*/}
                      </li>
                    </ul>
                  </li> :
                  <li className="welcome-area">
                    <Link to="/login" className="blue lighten-2">로그인 해보세요.</Link>
                  </li>
                }
                <li>
                  <NavLink to="/scrap" activeClassName="active">
                    <i className="small material-icons">folder_special</i><span>스크랩</span>
                  </NavLink>
                  <NavLink to="/review" activeClassName="active">
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

const mapDispatchToProps = (dispatch) => ({
    sideNavOpen: () => dispatch(sideNavOpen()),
    sideNavClose: () => dispatch(sideNavClose()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SideNavigation);