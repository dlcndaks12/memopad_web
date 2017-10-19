import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'react-materialize';

class NationTab extends Component {
    constructor(props) {
        super(props);

        this.handleNation = this.handleNation.bind(this);
    }

    handleNation() {
        const selectedNode = this.refs.nationTab._tabsEl.querySelector('.active').parentNode;
        const lastClassIdx = selectedNode.classList.length - 1;
        this.props.onChange(selectedNode.classList[lastClassIdx]);
    }

    render() {
        return (
            <div className="nation-tab-area">
                {this.props.nation ?
                    <Tabs ref="nationTab" className="nation-tab" onChange={this.handleNation} >
                        {this.props.nation.map((nation, i) => {
                            let active = nation.code === this.props.defaultValue;
                            return (
                                <Tab className={`${nation.code}`} key={i} title={nation.name} active={active} />
                            )
                        })}
                    </Tabs> : '' }
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    nation: state.location.nation,
});

export default connect(mapStateToProps, null)(NationTab);
