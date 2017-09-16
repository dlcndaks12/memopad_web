import React, { Component } from 'react';
import axios from 'axios';
import { Input } from 'react-materialize';
import * as path from 'config/path';
import { CircleLoader, Preview } from 'components';

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
            pending: false,
        };

        this.handleLink = this.handleLink.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.listenOGTag = this.listenOGTag.bind(this);
    }

    handleLink(e) {
        this.setState({
            url: e.target.value,
        });
        this.listenOGTag(e.target.value);
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
        return axios.get(`${path.__api__}/api/og`, {
            params: {
                url: url,
            }
        }).then((response) => {
            const res = response.data;
            if (res.result === 'OK') {
                this.setState({
                    result: res.result,
                    og: {
                        ...this.state.og,
                        ogImageUrl: res.data.ogImageUrl,
                        ogTitle: res.data.ogTitle,
                        ogDescription: res.data.ogDescription,
                    }
                });
            } else {
                this.setState({
                    result: res.result,
                    message: res.message,
                });
            }
        }).catch((error) => {
            console.log('catch', error.response);
        }).then(() => {
            this.setState({
                pending: false,
            });
        });
    }

    render() {
        return (
            <div>
                <div className="input-row">
                    <div className="select-area">
                        <Input s={12} type="select" defaultValue="1">
                            <option value="1">카테고리</option>
                            <option value="2">여행지</option>
                            <option value="3">맛집</option>
                            <option value="3">숙소</option>
                            <option value="3">물품</option>
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
                            <label>Link를 입력해주세요.</label>
                        </div>
                        {this.state.result !== 'OK' ? <div className="guide red-text text-accent-2">{this.state.message}</div> : ''}
                    </div>
                </div>
                {this.state.pending ? <CircleLoader /> :
                    this.state.result === 'OK' ?
                        <Preview og={this.state.og} onChange={this.handleInput}/> : ''}

                {/*<div className="fixed-action-btn horizontal">
                        <a className="btn-floating btn-large red">
                            <i className="large material-icons">mode_edit</i>
                        </a>
                    </div>*/}
            </div>
        );
    }
}

export default Write;