import React, { useState } from 'react';

import { filterProduct } from '../actions/product'; 

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
        if (minPrice < maxPrice) {
            await data.dispatch(filterProduct({ minPrice: parseInt(minValPr), maxPrice: parseInt(maxPrice)}, 'P'));
        }
    }

    const maxPriceVal = async (target) => { 
        let maxValuePr = target.target.value;
        await setMaxPrice(maxValuePr);
        if (minPrice < maxPrice) {
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

export default PriceFilter;