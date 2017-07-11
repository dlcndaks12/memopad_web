import React, {Component} from 'react';
import axios from 'axios';
import * as path from '../config/path';

class Home extends Component {
  constructor(props) {
    super(props);

    this.test = this.test.bind(this);
  }

  test() {
    axios.delete(`${path.__api__}/api/account/test`
    ).then((response) => {
      console.log('then', response);
    }).catch((error) => {
      console.log('catch', error);
    });
  }

  render() {
    return (
      <div>
        Home
        <button onClick={this.test}>test</button>
      </div>
    );
  }
}

export default Home;