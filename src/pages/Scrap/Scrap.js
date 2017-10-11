import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toastOpen } from 'actions/toast';
import { CardList, Locations, Categories } from 'components';

const $ = window.$;

class Scrap extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    $('ul.tabs').tabs();
  }


  handleLogin() {
    this.props.toastOpen('로그인 해주세요.', 2500);
    this.props.history.push('/login');
  }

  render() {
    const loginButton = (
      <div className="btn-write">
        <a href="#!" onClick={this.handleLogin}>
          <i className="material-icons">mode_edit</i>
        </a>
      </div>
    );

    const writeButton = (
      <div className="btn-write">
        <Link to="/write">
          <i className="material-icons">mode_edit</i>
        </Link>
      </div>
    );

    return (
      <div className="contents scrap">
        <ul className="tabs" ref="tabs">
          <li className="tab col s3"><a className="active" href="#test1">한국</a></li>
          <li className="tab col s3"><a href="#test2">일본</a></li>
          <li className="tab col s3"><a href="#test3">홍콩</a></li>
          <li className="tab col s3"><a href="#test3">마카오</a></li>
        </ul>

        <div className="option-area">
          <div className="option">
            <h6>지역</h6>
            <Locations/>
          </div>
          <div className="option">
            <h6>카테고리</h6>
            <Categories/>
          </div>
        </div>
        <CardList/>
        { this.props.status.isLoggedIn ? writeButton : loginButton }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  status: state.authentication.status,
});

const mapDispatchToProps = (dispatch) => ({
  toastOpen: (content, time) => dispatch(toastOpen(content, time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Scrap);