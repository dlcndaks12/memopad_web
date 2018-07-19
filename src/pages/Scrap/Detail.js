import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getScrap } from 'modules/scrap';
import { CircleLoader } from 'components';

class Detail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
        };
    }

    componentDidMount() {
        const idx = this.props.match.params.idx;
        this.props.getScrap(idx).then((res) => {
            this.setState({
                data: res.data,
            });
        });
    }

    render() {
        const data = this.state.data;
        return (
            <div className="contents scrap-write">
                {data ?
                    <div className="article">{data.title}</div>
                    : <CircleLoader/>}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    getScrap: (idx) => dispatch(getScrap(idx)),
});

export default connect(null, mapDispatchToProps)(Detail);