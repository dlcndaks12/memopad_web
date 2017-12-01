import React, { Component } from 'react';
import { connect } from 'react-redux';
import './NationTab.scss';

class NationTab extends Component {
    constructor(props) {
        super(props);

        this.handleNation = this.handleNation.bind(this);
    }

    render() {
        return (
            <div className="nation-tab-area">
                {this.props.nation ?
                    <ul ref="nationTab" className="tabs nation-tab">
                        {this.props.nation.map((nation) => {
                            const active = nation.code === this.props.selectedNationCode;
                            return (
                                <li key={nation.code} className={`tab col ${active ? 'active' : ''}`}>
                                    <a onClick={() => this.props.onChange(nation.code)}>{nation.name}</a>
                                </li>
                            )
                        })}
                    </ul> : '' }
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    nation: state.location.nation,
});

export default connect(mapStateToProps, null)(NationTab);
