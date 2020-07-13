import React from 'react';

import Header from '../component/header';
import Container from '../component/container';
import Footer from '../component/footer';

import '../App.css';

function Product() {
    return ( 
        <div className="Product">
            <Header/>
            <Container/>
            <Footer/>
        </div>
    );
}

export default Product;
