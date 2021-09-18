import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import '../Product/Product.css';

const Product = (props) => {
    //console.log(props);
    

    const {img, name, seller, price, stock} = props.product;
    return (
        <div className="product">
            <div>
                <img src={props.product.img} alt="" />
            </div>

            <div className="product-details">
                <h4 className="product-name">{props.product.name}</h4>
                <br />
                <p><small>by: {seller}</small></p>
                <p>${price}</p>
                <p><small>Only {stock} left in stock - Order soon</small></p>
                <button className="main-button" onClick = {() => props.handelAddProduct(props.product)}> 
                    <FontAwesomeIcon icon={faShoppingCart}/>Add to Cart
                </button>
            </div>
        </div>
    );
};

export default Product;