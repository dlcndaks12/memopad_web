import React, {Component} from 'react';
import { sakura } from 'lib/sakura';

class Sakura extends Component {

  componentDidMount() {
    sakura();
  }

  render() {
    return (
      <div className="sakura-wrap">
        <canvas id="sakura" />
      </div>
    );
  }
}

export default Sakura;
