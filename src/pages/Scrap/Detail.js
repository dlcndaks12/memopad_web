import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CircleLoader, ScrapDetail } from 'components';
import { getScrap, clearScrapList } from 'modules/scrap';

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
            <div className="contents scrap-detail">
                {data ?
                    <ScrapDetail data={data}/>
                  : <CircleLoader/>}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    getScrap: (idx) => dispatch(getScrap(idx)),
    clearScrapList: () => dispatch(clearScrapList()),
});

export default connect(null, mapDispatchToProps)(Detail);