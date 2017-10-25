import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toastOpen } from 'actions/toast';
import axios from 'axios';
import { Input } from 'react-materialize';
import { CircleLoader, Preview, Select } from 'components';

class Write extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url: '',
            message: '',
            result: '',
            og: {
                ogUrl: '',
                ogImageUrl: '',
                ogImageData: '',
                ogTitle: '',
                ogDescription: '',
            },
            pending: false,
            nationSelected: 'kr',
            citySelected: '6', // 서울
        };

        this.handleLink = this.handleLink.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.listenOGTag = this.listenOGTag.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleLink(e) {
        this.setState({
            url: e.target.value,
        });
        this.listenOGTag(e.target.value);
    }

    handleSelect(e) {
        console.log(e.target.name, e.target.selectedOptions[0].value);
        if (e.target.name === 'nation') {
            this.setState({
                [`${e.target.name}Selected`]: e.target.selectedOptions[0].value,
            });
        }
    }

    handleInput(e) {
        const name = e.target.name;
        if (name === 'og-title') {
            this.setState({
                og: {
                    ...this.state.og,
                    ogTitle: e.target.value,
                }
            });
        } else if (name === 'og-description') {
            this.setState({
                og: {
                    ...this.state.og,
                    ogDescription: e.target.value,
                }
            });
        }
    }

    listenOGTag(url) {
        this.setState({
            pending: true,
        });
        return axios.get(`/api/og`, {
            params: {
                url: url,
            }
        }).then((response) => {
            if (response.result === 'OK') {
                this.setState({
                    result: response.result,
                    og: {
                        ...this.state.og,
                        ogImageUrl: response.data.ogImageUrl,
                        ogTitle: response.data.ogTitle,
                        ogDescription: response.data.ogDescription,
                    }
                });
            } else {
                this.setState({
                    result: response.result,
                    message: response.message,
                });
            }
        }).catch((error) => {
            this.props.toastOpen(error.message, 2000);
        }).then(() => {
            this.setState({
                pending: false,
            });
        });
    }

    handleSubmit() {
        console.log('nation_code', this.state.nationSelected);
        console.log('city_idx', this.state.citySelected);
    }

    render() {
        const nationSelected = this.state.nationSelected;
        const citySelected = this.state.citySelected;
        const nation = this.props.location.nation;
        const city = this.props.location.city !== null ? this.props.location.city[nationSelected] : null;
        const cityLength = city !== null ? city.length : null;

        return (
            <div className="scrap-write">
                <blockquote>공유하고자 하는 link만 입력하시면 간편 스크랩 내용이 채워집니다.</blockquote>
                <div className={`input-row ${cityLength !== null && cityLength < 1 ? 'no-city' : ''}`}>
                    <div className="select-area nation-sel">
                        <Select defaultSelected={nationSelected} type="nation" option={nation} onChange={this.handleSelect} />
                    </div>
                    <div className="select-area city-sel">
                        <Select defaultSelected={citySelected} type="city" option={city} onChange={this.handleSelect} />
                    </div>
                    <div className="select-area category-sel">
                        <Input type="select" defaultValue="-1" onChange={this.handleSelect}>
                            <option value="-1">분류</option>
                            <option value="1">여행지</option>
                            <option value="2">맛집</option>
                            <option value="3">숙소</option>
                            <option value="4">쇼핑</option>
                        </Input>
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
                {this.state.pending ? <CircleLoader /> :
                    this.state.result === 'OK' ?
                        <Preview og={this.state.og} onChange={this.handleInput} onSubmit={this.handleSubmit}/> : ''}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    login: state.authentication.login,
    location: state.location,
});

const mapDispatchToProps = (dispatch) => ({
    toastOpen: (content, time) => dispatch(toastOpen(content, time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Write);