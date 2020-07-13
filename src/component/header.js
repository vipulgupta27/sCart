import React, { useState } from 'react';
import Logo from '../assets/logo.png';
import User from '../assets/user.png';
import Cart from '../assets/cart.jpg';
import '../App.css';
import { searchProduct } from '../actions/product';

import { connect } from 'react-redux';

function Product(props) {
    console.log(props);
    const [searchString, setSearchString] = useState('');
    const handleSearchString = ({ target }) => {
            setSearchString(target.value);
        };
    const handleClick = () => {
        props.dispatch(searchProduct(searchString));
    };
    return ( 
        <div className="fixed-header">
            <div>
                <img className="imageStyle logo" src={Logo} alt="Logo" />
                <input className="searchInput" type="text" value={searchString} onChange={handleSearchString}/>
                <button className="searchButton" onClick={handleClick}>Search</button>
                <div className="userInfo floatRight" >
                    <label className="userIDetail"><img className="userIcon" src={User} alt="User"/> {props.userName}</label><br/> 
                    <label className="userIDetail"><img className="userIcon" src={Cart} alt="User"/> {props.cartProductNo} Item</label> 
                </div>
            </div>
        </div>
    );
}
const mapStateToProps = state => ({
    userName: state.login.userName,
    cartProductNo: state.product.cartAdded
});

export default connect(mapStateToProps)(Product);
