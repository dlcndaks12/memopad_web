import React, {Component} from 'react';
import {Card} from 'components';

class CardList extends Component {
  render() {
    return (
      <div className="card-list">
        <div className="card-list-inner">
          <Card/>
          <Card/>
          <Card/>
        </div>
      </div>
    );
  }
}

export default CardList;
