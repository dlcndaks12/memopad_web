import React, { Component } from 'react';
import { connect } from 'react-redux';

class NationTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            width: '',
            left: '',
        };

        this.initActiveLine = this.initActiveLine.bind(this);
        this.handleTab = this.handleTab.bind(this);
    }

    componentDidMount() {
        this.initActiveLine();
    }

    componentDidUpdate(prevProps, prevState) {
        if (JSON.stringify(prevProps) !== JSON.stringify(this.props) || JSON.stringify(prevState) !== JSON.stringify(this.state)) {
            this.initActiveLine();
        }
    }

    initActiveLine() {
        if (this.refs.tabs) {
            const activedEl = this.refs.tabs.querySelector('.tab.active');
            this.setState({
                width: activedEl.getBoundingClientRect().width,
                left: activedEl.offsetLeft
            });
        }
    }

    handleTab(e, nationCode) {
        const tab = e.target;
        this.setState({
            width: tab.getBoundingClientRect().width,
            left: tab.offsetLeft
        }, () => {
            this.props.onChange(nationCode);
        });
    }

    render() {
        const lineStyle = {width: this.state.width, left: this.state.left};

        return (
            <div className="tab-area nation-tab-area">
                {this.props.nation ?
                    <ul ref="tabs" className="tabs nation-tab">
                        {this.props.nation.map((nation) => {
                            const active = nation.code === this.props.selectedNationCode;
                            return (
                                <li key={nation.code} className={`tab col ${active ? 'active' : ''}`}>
                                    <a onClick={(e) => this.handleTab(e, nation.code)}>{nation.name}</a>
                                </li>
                            )
                        })}
                    </ul> : '' }
                <div className="tab-active-line" style={lineStyle}/>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    nation: state.location.nation,
});

export default connect(mapStateToProps, null)(NationTab);
