import React from 'react';
import { connect } from 'react-redux';
import { setColor, setBrand} from '../actions/filter';
import { filterProduct } from '../actions/product';

const CheckboxFilter =  (props) => {
    const flag = props.flag ? "filterScroll" : "";
    const filterName = props.flag ? 'brand' : 'color';
    const index = props.flag ? 0: 1;
    const handleClick = async (e) => {
        console.log(e.target.value);
        const options = props.flag ? props.selectBrand : props.selectColor;
        let index
        if (e.target.checked) {
            options.push(e.target.value)
        } else {
            index = options.indexOf(e.target.value)
            options.splice(index, 1)
        }
        console.log(options);
        await !props.flag ? props.dispatch(setColor(options)) : props.dispatch(setBrand(options));
        await !props.flag ? props.dispatch(filterProduct({ 'C': options, 'B': props.selectBrand, 'MN': props.minPrice, 'MX': props.maxPrice })) : props.dispatch(filterProduct({ 'C': props.selectColor, 'B': options, 'MN': props.minPrice, 'MX': props.maxPrice }));
    }
    let optionItems = (props.filters[index]['values']).map((optionVal) =>
            <React.Fragment key={props.flag ? optionVal.title :optionVal.color} >
                <label className="floatLeft colorName" key={ props.flag ? optionVal.title :optionVal.color}>
                    <input type="checkbox" name={filterName} value={ props.flag ? optionVal.title :optionVal.color} onClick={handleClick}/>
                    {!props.flag && <div className="colorgrid" style={{backgroundColor: `${optionVal.color}`, marginRight: '0.5em'}}></div>}{optionVal.title}
                </label>
            </React.Fragment>
        );
    return (
        <div className ={`borderContainer insideFilter ${flag}`} >
            <h2>{props.filters[index]['type']}</h2>
            <div className="checkboxList filterList">
                {optionItems}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    filters: state.filter.filterList,
    selectColor: state.filter.selectColor,
    selectBrand: state.filter.selectBrand,
    minPrice: state.filter.minPrice,
    maxPrice: state.filter.maxPrice,
});

export default connect(mapStateToProps)(CheckboxFilter);