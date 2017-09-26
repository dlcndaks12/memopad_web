import React, { Component } from 'react';
import { Input } from 'react-materialize';

class Locations extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    console.log(e.target.checked);
  }

  render() {
    return (
      <div className="locations">
        <Input name='group1' type='checkbox' value='0' label='전체' defaultValue='checked' onChange={this.handleChange} />
        <Input name='group1' type='checkbox' value='1' label='서울' />
        <Input name='group1' type='checkbox' value='2' label='기장' />
      </div>
    );
  }
}

export default Locations;

