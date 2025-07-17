import React, { useContext } from "react";
import { cartContext } from "../store/cartContext";
import "./Cart.css"; // ✅ Import the CSS
import Navbar from "../components/Navbar";

import { ToastContainer, toast } from 'react-toastify';

const Cart = () => {
    const cartCtx = useContext(cartContext);

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />

            <Navbar />
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
                                        onClick={() => {cartCtx.removefromCart(index); toast.success(`${item.productName} removed from cart`)} }
                                    >
                                        ❌ Remove
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="cart-summary">
                    {cartCtx.cartItem.length > 0 &&
                        <div>
                            Checkout Price: ₹{cartCtx.totalPrice}
                            <br />
                            <button className="checkout-button" onClick={() => window.location.href = '/payment'}>
                                Proceed to Payment
                            </button>
                        </div>
                    }
                </div>
            </div>
        </>
    );
};

export default Cart;
