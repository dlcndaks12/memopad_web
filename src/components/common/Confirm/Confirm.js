import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { confirmClose } from 'actions/confirm';
import { sakura } from 'js/sakura';

class Confirm extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    sakura();
  }

  handleClick(result) {
    this.props.callback(result);
    this.props.confirmClose();
  }

  render() {
    let show = this.props.show ? 'active' : '';
    return (
      <div className={"confirm-alarm " + show} onClick={() => this.handleClick(false)}>
        <canvas id="sakura" />
        <div className="confirm-cont z-depth-2" onClick={(e) => {e.stopPropagation();}}>
          <div className="message">
            {this.props.content}
          </div>
          <div className="btn-area">
            <a className="waves-effect waves-light red lighten-3 btn" onClick={() => this.handleClick(true)}>예</a>
            <a className="waves-effect waves-light red lighten-3 btn" onClick={() => this.handleClick(false)}>아니오</a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    content: state.confirm.content,
    callback: state.confirm.callback,
    show: state.confirm.show,
});

const mapDispatchToProps = (dispatch) => ({
    confirmClose: () => dispatch(confirmClose()),
});

Confirm.propTypes = {
  content: PropTypes.string,
  callback: PropTypes.func,
  show: PropTypes.bool,
};
Confirm.defaultProps = {
  content: 'message',
  callback: null,
  show: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
