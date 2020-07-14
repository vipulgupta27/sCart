import React from 'react';
import { connect } from 'react-redux';

import Add from '../assets/add.png';
import {addToCart} from '../actions/product';

import '../App.css';

const ProductDetail = (props) => {
    const data = props.data;
    return data.map((val, index) => 
        <div className="product-flexbox-row child" key={val.id + index}>
            <img src={val.image} className="productImage" alt={val.title}/>
            <label>{val.title}</label>
            <label> {(val.brand).toLowerCase().replace(/\b[a-z]/g, function (letter) {
                    return letter.toUpperCase();
                })
            } </label>
            <label>Price: {val.price.final_price}$</label>
            <label>Discount: {val.discount}%</label>
            <label className="colorName">Color:<div className="colorgrid marginLeft" style={{backgroundColor: `${val.colour.color}`}}></div></label>
            <a href="#" onClick={()=>props.dispatch(addToCart())}><img src={Add} className="colorgrid" alt="Add To Cart"/> Add to cart</a>
        </div>
        
    );
}

function ProductList(props) {
    return ( 
        <div className="productList">
            <h3>Product List</h3>
            <div className="product-grid product-flexbox-column">
                <ProductDetail data={props.productList} dispatch={props.dispatch}/>
            </div>
        </div> 
    );
}
const mapStateToProps = state => ({
    productList: state.product.filterProduct,
    cartProductNo: state.product.cartAdded
});

export default connect(mapStateToProps)(ProductList);