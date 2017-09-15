import React, {Component} from 'react';
import axios from 'axios';

class Write extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputLink: '',
    };

    this.handleLink = this.handleLink.bind(this);
    this.listenOGTag = this.listenOGTag.bind(this);
  }

  handleLink(e) {
    this.setState({
      inputLink: e.target.value,
    });

    this.listenOGTag(e.target.value);
  }

  listenOGTag(url) {
    return axios.get(`https://opengraph.io/api/1.0/site/${url}?app_id=59bb6d94bf6665630cf1f1e0`, {
    }).then((response) => {
      console.log('then', response);
    }).catch((error) => {
      console.log('catch', error.response);
    });
  }


  render() {
    return (
      <div>
        <div className="input-field s12 link">
          <input
            name="link"
            type="text"
            value={this.state.inputLink}
            onChange={this.handleLink}
          />
          <label>Link</label>
        </div>
      </div>
    );
  }
}

export default Write;