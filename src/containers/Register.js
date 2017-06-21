import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Authentication } from '../components';

class Register extends Component {
  render() {
    return (
      <div>
        <Authentication
          mode={false}
        />
      </div>
    );
  }
}

Register.propTypes = {};
Register.defaultProps = {};

export default Register;
