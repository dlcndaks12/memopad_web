import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'modules/toast';
import { initOg, getOgByUrl, setOg, setOgMap } from 'modules/og';
import { registerScrap, updateScrap } from 'modules/scrap';
import { CircleLoader, Preview, Select, Input, Button } from 'components';
import { searchCoordinateToAddress } from 'util/map';

class Write extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nationSelected: props.nationSelected,
            citySelected: props.citySelected,
            categorySelected: -1,
        };
    }

    render() {
        const nationSelected = this.state.nationSelected;
        const citySelected = this.state.citySelected;
        const nation = this.props.location.nation;
        const city = this.props.location.city !== null ? this.props.location.city[nationSelected] : null;
        const cityLength = city !== null ? city.length : null;

        return (
            <div className="write-area">
                <div className={`input-row ${cityLength !== null && cityLength < 1 ? 'no-city' : ''}`}>
                    <div className="select-area nation-sel">
                        <Select defaultSelected={nationSelected} type="nation" option={nation} onChange={this.handleSelect}/>
                    </div>
                    <div className="select-area city-sel">
                        <Select defaultSelected={citySelected} type="city" option={city} onChange={this.handleSelect}/>
                    </div>
                    <div className="input-area">
                        <div className="input-field link">
                            <Input id="link"
                                   name="link"
                                   placeholder="제목을 입력해주세요."
                                   onChange={(e) => this.handleTitle(e.target.value)}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    pending: state.pender.pending,
    og: state.og,
    location: state.location,
    category: state.category.category,
    nickname: state.auth.nickname,
});

const mapDispatchToProps = (dispatch) => ({
    initOg: () => dispatch(initOg()),
    getOgByUrl: (url) => dispatch(getOgByUrl(url)),
    setOg: (og) => dispatch(setOg(og)),
    setOgMap: (ogMap) => dispatch(setOgMap(ogMap)),
    registerScrap: (nationCode, cityIdx, categoryIdx, og) => dispatch(registerScrap(nationCode, cityIdx, categoryIdx, og)),
    updateScrap: (scrapIdx, nationCode, cityIdx, categoryIdx, og) => dispatch(updateScrap(scrapIdx, nationCode, cityIdx, categoryIdx, og)),
    toast: (content, time) => dispatch(toast(content, time)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Write));
