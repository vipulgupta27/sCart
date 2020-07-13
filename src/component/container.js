import React from 'react';
import { connect } from 'react-redux';

import Filter from './filter';
import ProductList from './productlist';

import '../App.css';


function Container(props) {
    return (
        <div className="container">
            <Filter/>
            <ProductList/>
        </div>    
    );
}
const mapStateToProps = state => ({
    userName: state.login.userName,
    cartProductNo: state.product.cartAdded
});

export default connect(mapStateToProps)(Container);
