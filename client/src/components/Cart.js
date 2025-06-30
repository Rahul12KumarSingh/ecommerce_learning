import React from "react";
import "./Cart.css";

const Cart = ({ cart, disCountPrice, totalPrice, removeFromCart }) => {
    return (
        <div className="cart-container">
            <h2 className="cart-title">Cart</h2>
            {cart.length === 0 ? (
                <p className="empty-cart">Your cart is empty.</p>
            ) : (
                cart.map((item) => (
                    <div key={item.id} className="cart-item">
                        <h3 className="cart-item-name">{item.Product.name}</h3>
                        <p className="cart-item-price">Price: ₹{item.Product.price} x {item.quantity}</p>
                        <button className="remove-button" onClick={() => removeFromCart(item.productId)}>Remove</button>
                    </div>
                ))
            )}
            <div className="cart-total">Total Price: ₹{totalPrice}</div>
            <div className="cart-discount">Discounted Price: ₹{disCountPrice}</div>
        </div>
    );
};

export default Cart;
