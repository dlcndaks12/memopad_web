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
        <Input name='group1' type='checkbox' value='all' label='전체' defaultValue='checked' onChange={this.handleChange} />
        <Input name='group1' type='checkbox' value='1' label='여행지' onChange={this.handleChange} />
        <Input name='group1' type='checkbox' value='1' label='맛집' onChange={this.handleChange} />
        <Input name='group1' type='checkbox' value='2' label='숙소' onChange={this.handleChange} />
        <Input name='group1' type='checkbox' value='2' label='쇼핑' onChange={this.handleChange} />
      </div>
    );
  }
}

export default Locations;

