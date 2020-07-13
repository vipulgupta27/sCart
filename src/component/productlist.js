import React from 'react';
import { connect } from 'react-redux';

import Add from '../assets/add.png';
import {addToCart} from '../actions/product';

import '../App.css';

const ProductDetail = (props) => {
    const data = props.data;
    return data.map((val) => 
        <React.Fragment key={val.id} >
            <div className="product-flexbox-row child">
                <img src={val.image} className="productImage"/>
                <label>{val.title}</label>
                <label> {(val.brand).toLowerCase().replace(/\b[a-z]/g, function (letter) {
                        return letter.toUpperCase();
                    })
                } </label>
                <label>Price: {val.price.final_price}$</label>
                <label>Discount: {val.discount}%</label>
                <label className="colorName">Color:<div className="colorgrid marginLeft" style={{backgroundColor: `${val.colour.color}`}}></div></label>
                <a href="#" onClick={()=>props.dispatch(addToCart())}><img src={Add} className="colorgrid"/> Add to cart</a>
            </div>
        </React.Fragment>
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
    productList: state.product.productList,
    cartProductNo: state.product.cartAdded
});

export default connect(mapStateToProps)(ProductList);