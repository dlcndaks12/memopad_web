import React, {Component} from 'react';
import { Card } from 'components';

class CardList extends Component {
    render() {
        return (
            <div className="card-list">
                <div className="card-list-inner">
                    {this.props.cards.map((item) =>
                        <Card key={item.idx} item={item}/>
                    )}
                </div>
            </div>
        );
    }
}

export default CardList;
