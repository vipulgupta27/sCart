import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { filterProduct } from '../actions/product'; 

import '../App.css';

const checkPrice = (minPrice, maxPrice) => {
    let minValue = (minPrice === 'Min') ? 0 : parseInt(minPrice);
    let maxValue = (maxPrice === 'Max') ? 5000 : parseInt(maxPrice);
    if (minValue < maxValue) {
        return true;
    } else {
        return false;
    }
}
const PriceFilter = (data) => {
    const [minPrice, setMminPrice] = useState('Min');
    const [maxPrice, setMaxPrice] = useState('Max');
    let props = data.props
    const heading = props['type'];
    const optionVal = props['values'];
    let optionItems = optionVal.map((optionVal) =>
                <option key={optionVal.key} value={optionVal.key}>{optionVal.displayValue}</option>
            );
    const minPriceVal = async (target) => {
        let minValPr = target.target.value;
        minValPr = minValPr === 'Min' ? 0 : (minValPr === 'Max' ? 5000 : minValPr);
        let maxPriceval = maxPrice === 'Min' ? 0 : (maxPrice === 'Max' ? 5000 : maxPrice);
        await setMminPrice(minValPr);
        
        if (checkPrice(minValPr, maxPriceval)) {
            await data.dispatch(filterProduct({
                minPrice: parseInt(minValPr),
                maxPrice: parseInt(maxPriceval)
            }, 'P'));
        }
    }
    const maxPriceVal = async (target) => { 
        let maxValuePr = target.target.value;
        maxValuePr = maxValuePr === 'Min' ? 0 : (maxValuePr === 'Max' ? 5000 : maxValuePr);
        let minPriceVal = minPrice === 'Min' ? 0 : (minPrice === 'Max' ? 5000 : minPrice);
        await setMaxPrice(maxValuePr);
        if (checkPrice(minPriceVal, maxValuePr)) {
            await data.dispatch(filterProduct({
                minPrice: parseInt(minPriceVal),
                maxPrice: parseInt(maxValuePr)
            }, 'P'));
        }
    }
    return (
        <div className = "borderContainer insideFilter" >
            <h2>{heading}</h2>
            <div className="dropdownList">
                <select onChange={minPriceVal} value={minPrice}>
                    {optionItems}
                </select>
                <select onChange={maxPriceVal} value={maxPrice}>
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
    if (!props.isLogin) {
        localStorage.setItem('isLogin', true);
        localStorage.setItem('userName', this.props.userName);
        return <Redirect to = '/' / > ;
    }
    return (
        <div className="filter">
            <h3>Filter</h3>
            <div className="filterList">
                <PriceFilter props={props.filters[2]} dispatch={props.dispatch}/>
                <CheckboxFilter props={props.filters[1]} flag={false} dispatch={props.dispatch}/>
                <CheckboxFilter props={props.filters[0]} flag dispatch={props.dispatch}/>
            </div>
        </div>
            
    );
}
const mapStateToProps = state => ({
    filters: state.filter.filterList,
    isLogin: state.login.isLogin,
});

export default connect(mapStateToProps)(Filter);
