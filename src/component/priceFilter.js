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

    const minPriceVal = async (target) => {
        let minValPr = target.target.value;
        props.dispatch(setMinPrice(minValPr));
        if (minValPr < maxPrice) await props.dispatch(filterProduct({ minPrice: parseInt(minValPr), maxPrice: parseInt(maxPrice)}, 'P'));
    }

    const maxPriceVal = async (target) => { 
        let maxValuePr = target.target.value;
        props.dispatch(setMaxPrice(maxValuePr));
        if (minPrice < maxValuePr) await props.dispatch(filterProduct({ minPrice: parseInt(minPrice), maxPrice: parseInt(maxValuePr)}, 'P'));
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
});

export default connect(mapStateToProps)(PriceFilter);