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
    const [minPrice, setMminPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(5000);
    let props = data.props
    const heading = props['type'];
    const optionVal = props['values'];
    let optionItems = optionVal.map((optionVal) =>{
        if (optionVal.key === 'Min') {
            return <option key={optionVal.key} value={0}>{optionVal.displayValue}</option>;
        }else if (optionVal.key === 'Max'){
            return <option key={optionVal.key} value={5000}>{optionVal.displayValue}</option>;
        }else{
            return <option key={optionVal.key} value={parseInt(optionVal.key)}>{optionVal.displayValue}</option>;
        }
    });
    const minPriceVal = async (target) => {
        let minValPr = target.target.value;
        await setMminPrice(minValPr);
        
        if (checkPrice(minValPr, maxPrice)) {
            await data.dispatch(filterProduct({ minPrice: parseInt(minValPr), maxPrice: parseInt(maxPrice)}, 'P'));
        }
    }

    const maxPriceVal = async (target) => { 
        let maxValuePr = target.target.value;
        await setMaxPrice(maxValuePr);
        if (checkPrice(minPrice, maxValuePr)) {
            await data.dispatch(filterProduct({ minPrice: parseInt(minPrice), maxPrice: parseInt(maxValuePr)
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
    let filterName = data.flag ? 'brand': 'color';
    const heading = props['type'];
    const optionVal = props['values'];
    let optionItems = optionVal.map((optionVal) =>
            <React.Fragment key={data.flag ? optionVal.title :optionVal.color} >
                <label className="floatLeft colorName" key={ data.flag ? optionVal.title :optionVal.color}><input type="checkbox" name={filterName} value={ data.flag ? optionVal.title :optionVal.color} />
                    {!data.flag && <div className="colorgrid" style={{backgroundColor: `${optionVal.color}`, marginRight: '0.5em'}}></div>}{" "+optionVal.title}
                </label>
            </React.Fragment>
        );
    return (
        <div className ={`borderContainer insideFilter ${flag}`} >
            <h2>{heading}</h2>
            <div className="checkboxList filterList">
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
