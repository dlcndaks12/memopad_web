import React, {Component} from 'react';
import { connect } from 'react-redux';
import { auth } from '../actions/authentication';

/**
 * 공통 세팅을 위한 컴포넌트
 *
 */
class Root extends Component {
  componentDidMount() {
    return this.props.auth().then(
      () => {
        console.log(this.props.auth.id);
        if(this.props.auth.id === undefined) {
          //로그인성공했을때세션굽고세션이용하기로
        }
      }
    );
  }

  render() {
    return (
      <div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.authentication.auth,
});

const mapDispatchToProps = (dispatch) => ({
  auth: () => dispatch(auth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);