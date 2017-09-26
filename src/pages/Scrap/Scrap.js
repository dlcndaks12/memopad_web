import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CardList, Locations, Categories } from 'components';

class Scrap extends Component {
  render() {
    return (
      <div className="contents scrap">
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
        <div className="btn-write">
          <Link to="/write">
            <i className="material-icons">mode_edit</i>
          </Link>
        </div>
      </div>
    );
  }
}

export default Scrap;