import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleLogin() {
    this.props.handleLogin(this.state.username, this.state.password);
  }

  render() {
    const inputBoxes = (
      <div>
        <div className="input-field col s12 username">
          <label>Username</label>
          <input
            name="username"
            type="text"
            className="validate"
            value={this.state.username}
            onChange={this.handleChange}
          />
        </div>
        <div className="input-field col s12">
          <label>Password</label>
          <input
            name="password"
            type="password"
            className="validate"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );

    const loginView = (
      <div>
        <div className="card-content">
          <div className="row">
            {inputBoxes}
            <a onClick={this.handleLogin} className="waves-effect waves-light btn">SUBMIT</a>
          </div>
        </div>
        <div className="footer">
          <div className="card-content">
            <div className="right" >
              New Here? <Link to="/register">Create an account</Link>
            </div>
          </div>
        </div>
      </div>
    );

    const registerView = (
      <div className="card-content">
        <div className="row">
          {inputBoxes}
          <a className="waves-effect waves-light btn">CREATE</a>
        </div>
      </div>
    );

    return (
      <div className="container auth">
        <Link className="logo" to="/">MEMOPAD</Link>
        <div className="card">
          <div className="header blue white-text center">
            <div className="card-content">{this.props.mode ? "LOGIN" : "REGISTER"}</div>
          </div>
          {this.props.mode ? loginView : registerView }
        </div>
      </div>
    );
  }
}

Authentication.propTypes = {
  mode: PropTypes.bool,
  onLogin: PropTypes.func,
  onLoRegister: PropTypes.func
};
Authentication.defaultProps = {
  mode: true,
  onLogin: (id, pw) => { console.error("login function not defined"); },
  onRegister: (id, pw) => { console.error("register function not defined"); }
};

export default Authentication;
