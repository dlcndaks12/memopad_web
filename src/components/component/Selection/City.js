import React, { Component } from 'react';
import { Input } from 'react-materialize';

class City extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checkedAll: true,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const value = e.target.value;
        const checked = e.target.checked;
        const chkArea = this.refs.nationChkList;
        const chkList = chkArea.querySelectorAll('[name="city"]');

        if (value === 'all') {
            this.setState({
                checkedAll: checked,
            });
            for (let i = 0; i < chkList.length; i++) {
                chkList[i].checked = checked
            }
        }

        const chkCheckedList = chkArea.querySelectorAll('[name="city"]:checked');

        this.setState({
            checkedAll: chkList.length === chkCheckedList.length,
        });

        let checkedValue = [];
        for (let i = 0; i < chkCheckedList.length; i++) {
            checkedValue.push(chkCheckedList[i].value);
        }
        this.props.onChangeCity(checkedValue);
    }

    render() {
        return (
            <div className="locations" ref="nationChkList">
                <Input name="city-all" type="checkbox" value="all" label="전체" checked={this.state.checkedAll} onChange={this.handleChange} />
                {this.props.city !== null ?
                    this.props.city.map((city, i) => {
                        return (
                            <Input name="city" type="checkbox" key={i} value={city.idx.toString()} label={city.name} defaultChecked="checked" onChange={this.handleChange} />
                        )
                    }) : '' }
            </div>
        );
    }
}

export default City;

