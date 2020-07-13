import React from 'react';
import { connect } from 'react-redux';

import '../App.css';

const PriceFilter = (data) => {
    let props = data.props
    const heading = props['type'];
    const optionVal = props['values'];
    let optionItems = optionVal.map((optionVal) =>
                <option key={optionVal.key} value={optionVal.key}>{optionVal.displayValue}</option>
            );
    return (
        <div className = "borderContainer insideFilter" >
            <h2>{heading}</h2>
            <div className="dropdownList">
                <select>
                    {optionItems}
                </select>
                <select>
                    {optionItems}
                </select>
            </div>
        </div>
    )
}

const CheckboxFilter = (data) => {
    let props = data.props;
    let flag = data.flag ? "filterScroll" : "";
    const heading = props['type'];
    const optionVal = props['values'];
    let optionItems = optionVal.map((optionVal) =>
                <label className="floatLeft" key={ data.flag ? optionVal.title :optionVal.color}><input type="checkbox" name="color" value={ data.flag ? optionVal.title :optionVal.color} />{optionVal.title}<br/></label>
            );
    return (
        <div className ={`borderContainer insideFilter ${flag}`} >
            <h2>{heading}</h2>
            <div className="checkboxList">
                {optionItems}
            </div>
        </div>
    )
}

function Filter(props) {
    return (
        <div className="filter">
            <h3>Filter</h3>
            <div className="filterList">
                <PriceFilter props={props.filters[2]}/>
                <CheckboxFilter props={props.filters[1]} flag={false}/>
                <CheckboxFilter props={props.filters[0]} flag/>
            </div>
        </div>
            
    );
}
const mapStateToProps = state => ({
    filters: state.filter.filterList,
});

export default connect(mapStateToProps)(Filter);
