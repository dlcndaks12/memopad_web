import React, {Component} from 'react';
import { sakura } from 'js/sakura';

class Sakura extends Component {

  componentDidMount() {
    sakura();
  }

  render() {
    return (
      <div className="sakura-">
        <canvas id="sakura" />
      </div>
    );
  }
}

export default Sakura;
