import React from 'react';
import { connect } from 'react-redux';

import { filterProduct } from '../actions/product'; 
import { setMinPrice, setMaxPrice } from '../actions/filter';

const PriceFilter = (props) => {
    const minPrice = parseInt(props.minPrice);
    const maxPrice = parseInt(props.maxPrice);
    
    let optionItems = (props.filters[2]['values']).map((optionVal) => {
        let priceVal = (optionVal.key === 'Min') ? 0 : ((optionVal.key === 'Max') ? 5000 : optionVal.key);
        return <option key={optionVal.key} value={parseInt(priceVal)}>{optionVal.displayValue}</option>;
    });

    const minPriceVal = async (e) => {
        let minValPr = e.target.value;
        props.dispatch(setMinPrice(minValPr));
        if (minValPr < maxPrice) await props.dispatch(filterProduct({ 'MN': parseInt(minValPr), 'MX': parseInt(maxPrice), 'B': props.selectBrand, 'C': props.selectColor}));
    }

    const maxPriceVal = async (e) => { 
        let maxValuePr = e.target.value;
        props.dispatch(setMaxPrice(maxValuePr));
        if (minPrice < maxValuePr) await props.dispatch(filterProduct({ 'MN': parseInt(minPrice), 'MX': parseInt(maxValuePr), 'B': props.selectBrand, 'C': props.selectColor}));
    }
    return (
        <div className = "borderContainer insideFilter" >
            <h2>{props.filters[2]['type']}</h2>
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

const mapStateToProps = state => ({
    filters: state.filter.filterList,
    minPrice: state.filter.minPrice,
    maxPrice: state.filter.maxPrice,
    selectBrand: state.filter.selectBrand,
    selectColor: state.filter.selectColor,
});

export default connect(mapStateToProps)(PriceFilter);