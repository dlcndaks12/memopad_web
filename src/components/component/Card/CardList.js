import React, {Component} from 'react';
import {Card} from 'components';

class CardList extends Component {
  render() {
    return (
      <div className="card-list">
        <Card/>
        <Card/>
        <Card/>
      </div>
    );
  }
}

export default CardList;
