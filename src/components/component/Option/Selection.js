import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from 'react-materialize';

class City extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checkedAll: props.scrapListCondition[props.type] === 'all',
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const value = e.target.value;
        const checked = e.target.checked;
        const chkArea = this.refs[`${this.props.type}List`];
        const chkList = chkArea.querySelectorAll(`[name="${this.props.type}"]`);
        let checkedValue = [];

        if (value === 'all') {
            this.setState({
                checkedAll: checked,
            });
            for (let i = 0; i < chkList.length; i++) {
                chkList[i].checked = checked
            }
            checkedValue = checked ? 'all' : 'none';
        } else {
            const chkCheckedList = chkArea.querySelectorAll(`[name="${this.props.type}"]:checked`);

            if (chkList.length === chkCheckedList.length) {
                this.setState({
                    checkedAll: true,
                });
                checkedValue = 'all';
            } else {
                this.setState({
                    checkedAll: false,
                });
                for (let i = 0; i < chkCheckedList.length; i++) {
                    checkedValue.push(chkCheckedList[i].value);
                }
            }
        }
        this.props.onChange(checkedValue, this.props.type);
    }

    render() {
        const type = this.props.type;
        const condition = this.props.scrapListCondition[type];
        let checked = false;

        return (
            <div className="selection" ref={`${this.props.type}List`}>
                <Input name={`${this.props.type}-all`} type="checkbox" value="all" label="전체" checked={this.state.checkedAll} onChange={this.handleChange} />
                {this.props.item !== null ?
                    this.props.item.map((item, i) => {
                        const items = condition;
                        checked = items !== 'none' ? items === 'all' ? true : items.indexOf(item.idx.toString()) >= 0 : false;
                        return (
                            <Input name={this.props.type} type="checkbox" key={i} value={item.idx.toString()} label={item.name} defaultChecked={checked} onChange={this.handleChange} />
                        )
                    }) : '' }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    city: state.location.city,
    category: state.category.category,
    scrapListCondition: state.scrap.scrapListCondition,
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(City);

