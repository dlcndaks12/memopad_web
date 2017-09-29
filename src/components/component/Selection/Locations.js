import React, { Component } from 'react';
import { Input } from 'react-materialize';

class Locations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedAll: true,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const value = e.target.value;
    const checked = e.target.checked;
    if (value === 'all') {
      this.setState({
        checkedAll: checked,
      });
    }
  }

  render() {
    return (
      <div className="locations">
        <Input name="group1" type="checkbox" value="all" label="전체" checked={this.state.checkedAll} onChange={this.handleChange} />
        <Input name="group1" type="checkbox" value="1" label="서울" defaultChecked="checked" onChange={this.handleChange} />
        <Input name="group1" type="checkbox" value="2" label="기장" defaultChecked="checked" onChange={this.handleChange} />
      </div>
    );
  }
}

export default Locations;

