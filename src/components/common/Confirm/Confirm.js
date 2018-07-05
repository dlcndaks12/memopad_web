import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { confirmClose } from 'modules/confirm';
import { Button } from 'components'

class Confirm extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(result) {
        this.props.callback(result);
        this.props.confirmClose();
    }

    render() {
        let show = this.props.show ? 'active' : '';
        return (
            <div className={"confirm-alarm " + show} onClick={() => this.handleClick(false)}>
              <div className="confirm-cont" onClick={(e) => {e.stopPropagation();}}>
                <div className="message">
                    {this.props.message}
                </div>
                <div className="btn-area">
                    <Button color="gray" onClick={() => this.handleClick(true)}>예</Button>
                    <Button color="gray" onClick={() => this.handleClick(false)}>아니오</Button>
                </div>
              </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    message: state.confirm.message,
    callback: state.confirm.callback,
    show: state.confirm.show,
});

const mapDispatchToProps = (dispatch) => ({
    confirmClose: () => dispatch(confirmClose()),
});

Confirm.propTypes = {
    message: PropTypes.string,
    callback: PropTypes.func,
    show: PropTypes.bool,
};
Confirm.defaultProps = {
    content: 'message',
    callback: null,
    show: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
