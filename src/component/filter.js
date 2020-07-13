import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import PriceFilter from './priceFilter';

import '../App.css';

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
