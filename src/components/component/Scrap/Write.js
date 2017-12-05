import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'modules/toast';
import { initOg, getOgByUrl, setOg } from 'modules/og';
import { registerScrap } from 'modules/scrap';
import { CircleLoader, Preview, Select } from 'components';

class Write extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url: '',
            nationSelected: props.nationSelected,
            citySelected: props.citySelected,
            categorySelected: -1,
            requestOgTimer: null,
        };

        this.props.initOg();

        this.handleLink = this.handleLink.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.listenOGTag = this.listenOGTag.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleLink(e) {
        const value = e.target.value;
        this.setState({
            url: value,
        });
        /* n초간 입력이 없을시 request 요청 */
        clearTimeout(this.state.requestOgTimer);
        this.setState({
            requestOgTimer: setTimeout(() => {
                                this.listenOGTag(value);
                            }, 1000),
        });
    }

    listenOGTag(url) {
        this.props.getOgByUrl(url)
            .then(() => {
                if (this.props.og.result !== 'OK') {
                    this.props.toast(this.props.og.message);
                }
            });
    }

    handleSelect(e) {
        if (e.target.name === 'nation') {
            const cityLength = this.props.location.city[e.target.selectedOptions[0].value].length;
            const defaultCityIdx = cityLength > 0 ? this.props.location.city[e.target.selectedOptions[0].value][0].idx : -1;
            this.setState({
                [`${e.target.name}Selected`]: e.target.selectedOptions[0].value,
                citySelected: defaultCityIdx,
            });
        } else {
            this.setState({
                [`${e.target.name}Selected`]: e.target.selectedOptions[0].value,
            });
        }
    }

    handleInput(e) {
        const name = e.target.name;
        if (name === 'og-title') {
            this.props.setOg({
                ogTitle: e.target.value,
                ogDescription: this.props.og.ogDescription,
            });
        } else if (name === 'og-description') {
            this.props.setOg({
                ogTitle: this.props.og.ogDescription,
                ogDescription: e.target.value,
            });
        }
    }

    handleSubmit() {
        const nationCode = this.state.nationSelected;
        const cityIdx = this.state.citySelected;
        const categoryIdx = this.state.categorySelected;
        const og = this.props.og.og;

        if (categoryIdx === -1) {
            this.props.toast('분류를 선택해주세요.');
            return;
        }

        this.props.registerScrap(nationCode, cityIdx, categoryIdx, og)
            .then((res) => {
                if (res.result === 'OK') {
                    this.props.toast(res.message);
                    this.props.history.push('/scrap');
                }
            }).catch((error) => {
                this.props.toast(error.message);
            });
    }

    render() {
        const nationSelected = this.state.nationSelected;
        const citySelected = this.state.citySelected;
        const nation = this.props.location.nation;
        const city = this.props.location.city !== null ? this.props.location.city[nationSelected] : null;
        const category = this.props.category;
        const cityLength = city !== null ? city.length : null;

        return (
            <div className="write-area">
                <div className={`input-row ${cityLength !== null && cityLength < 1 ? 'no-city' : ''}`}>
                    <div className="select-area nation-sel">
                        <Select defaultSelected={nationSelected} type="nation" option={nation} onChange={this.handleSelect} />
                    </div>
                    <div className="select-area city-sel">
                        <Select defaultSelected={citySelected} type="city" option={city} onChange={this.handleSelect} />
                    </div>
                    <div className="select-area category-sel">
                        <Select type="category" option={category} onChange={this.handleSelect} />
                    </div>
                    <div className="input-area">
                        <div className="input-field link">
                            <input
                                name="link"
                                type="text"
                                value={this.state.url}
                                onChange={this.handleLink}
                            />
                            <label>공유하고자 하는 link를 입력해주세요.</label>
                        </div>
                        {this.state.result !== 'OK' ? <div className="guide red-text text-accent-2">{this.state.message}</div> : ''}
                    </div>
                </div>
                {this.props.pending['scrap/GET_OG_BY_URL'] ? <CircleLoader color="blue" /> :
                    this.props.og.result === 'OK' ?
                        <div className="scrap-view">
                            <Preview
                                og={this.props.og.og}
                                onChange={this.handleInput}
                                onSubmit={this.handleSubmit} />
                            <div className="submit-area">
                                {this.props.pending['scrap/REGISTER_SCRAP'] ?
                                    <button className="btn-large waves-effect waves-light blue lighten-1" type="button" name="action">
                                        <CircleLoader/>
                                    </button>
                                    :
                                    <button className="btn-large waves-effect waves-light blue lighten-1" type="button" name="action" onClick={this.handleSubmit}>
                                        등록
                                        <i className="material-icons right">send</i>
                                    </button>}
                            </div>
                        </div> : ''}
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
    registerScrap: (nationCode, cityIdx, categoryIdx, og) => dispatch(registerScrap(nationCode, cityIdx, categoryIdx, og)),
    toast: (content, time) => dispatch(toast(content, time)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Write));
