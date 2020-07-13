import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import PriceFilter from './priceFilter';
import CheckboxFilter from './checkboxFilter';
import '../App.css';



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
                <PriceFilter/>
                <CheckboxFilter flag={false}/>
                <CheckboxFilter flag/>
            </div>
        </div>
            
    );
}
const mapStateToProps = state => ({
    filters: state.filter.filterList,
    isLogin: state.login.isLogin,
});

export default connect(mapStateToProps)(Filter);
