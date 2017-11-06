import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'actions/toast';
import axios from 'axios';
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
                ogTitle: '',
                ogDescription: '',
            },
            ogPending: false,
            submitPending: false,
            nationSelected: props.nationSelected,
            citySelected: props.citySelected,
            categorySelected: -1,
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
            ogPending: true,
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
                        ogUrl: response.data.ogUrl,
                    }
                });
            } else {
                this.setState({
                    result: response.result,
                    message: response.message,
                });
            }
        }).catch((error) => {
            this.props.toast(error.message);
        }).then(() => {
            this.setState({
                ogPending: false,
            });
        });
    }

    handleSubmit() {
        const nationCode = this.state.nationSelected;
        const cityIdx = this.state.citySelected;
        const categoryIdx = this.state.categorySelected;
        const og = this.state.og;

        if (categoryIdx === -1) {
            this.props.toast('분류를 선택해주세요.');
            return;
        }

        this.setState({
            submitPending: true,
        });

        axios.post(`/api/scrap`, {
            nationCode: nationCode,
            cityIdx: cityIdx,
            categoryIdx: categoryIdx,
            imageUrl: og.ogImageUrl,
            title: og.ogTitle,
            description: og.ogDescription,
            url: og.ogUrl,
        }).then((response) => {
            console.log(response);
            if (response.result === 'OK') {
                this.props.toast(response.message);
                this.props.history.push('/scrap');
            } else {
                this.setState({
                    result: response.result,
                    message: response.message,
                });
            }
        }).catch((error) => {
            this.props.toast(error.message);
        }).then(() => {
            this.setState({
                submitPending: false,
            });
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
                {this.state.ogPending ? <CircleLoader color="blue" /> :
                    this.state.result === 'OK' ?
                        <Preview
                            og={this.state.og}
                            submitPending={this.state.submitPending}
                            onChange={this.handleInput}
                            onSubmit={this.handleSubmit} /> : ''}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    location: state.location,
    category: state.category.category,
    nickname: state.authentication.status.nickname,
});

const mapDispatchToProps = (dispatch) => ({
    toast: (content, time) => dispatch(toast(content, time)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Write));
