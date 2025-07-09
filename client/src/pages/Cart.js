import React, { useContext } from "react";
import { cartContext } from "../store/cartContext";
import "./Cart.css"; // ✅ Import the CSS

const Cart = () => {
    const cartCtx = useContext(cartContext);

    return (
        <div className="cart-container">
            <h2 className="cart-title">🛒 Your Cart</h2>

            <div className="cart-items">
                {cartCtx.cartItem.length === 0 ? (
                    <p className="empty-cart">Your cart is empty.</p>
                ) : (
                    cartCtx.cartItem.map((item, index) => (
                        <div key={item.id} className="cart-item-card">
                            <img src={item.productImg} alt={item.productName} className="cart-item-img" />
                            <div className="cart-item-info">
                                <h3 className="cart-item-name">{item.productName}</h3>
                                <p className="cart-item-price">Price: ₹{item.price}</p>
                                <button
                                    className="remove-btn"
                                    onClick={() => cartCtx.removefromCart(index)}
                                >
                                    ❌ Remove
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="cart-summary">
                <p>Total Price: ₹<span>{cartCtx.totalPrice}</span></p>
                <p>Discounted Price: ₹<span>{cartCtx.discountedPrice}</span></p>
            </div>
        </div>
    );
};

export default Cart;
