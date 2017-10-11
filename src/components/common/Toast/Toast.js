import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toastClose } from '../../../actions/toast';


class Toast extends Component {

  componentWillReceiveProps(nextProps) {
    if(nextProps.show) {
      setTimeout(() => {
        this.props.toastClose();
      }, nextProps.time);
    }
  }

  render() {
    let show = this.props.show ? 'active' : '';
    return (
      <div className={"toast-alarm " + show} >
        {this.props.content}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    content: state.toast.content,
    time: state.toast.time,
    show: state.toast.show,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toastClose: () => {
      return dispatch(toastClose());
    }
  }
};

Toast.propTypes = {
  content: PropTypes.string,
  time: PropTypes.number,
  show: PropTypes.bool,
};
Toast.defaultProps = {
  content: 'message',
  time: 500,
  show: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(Toast);
