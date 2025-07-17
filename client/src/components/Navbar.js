import React, { useContext } from 'react';
import { authContext } from '../store/authContex';
import { cartContext } from '../store/cartContext';

import '../pages/Home.css'; // Assuming you have a CSS file for styling
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const authCtx = useContext(authContext);
    const cartCtx = useContext(cartContext);
    const navigate = useNavigate();

    return (
        <header className="home-header">
            <div onClick={()=> navigate('/home')} className="user-info">
                <h1>Welcome</h1> <span className="username">{authCtx.user.name}</span>
                <img src={authCtx.user.profileImage} alt="Profile" className="profile-image" />
            </div>

            <div className="action-buttons">
                <div className="order-link" onClick={() => navigate('/order')}>
                    📦 Order Items
                </div>

                <div className="cart-info" onClick={() => navigate('/cart')}>
                    🛒 Cart Items: <span className="cart-count">{cartCtx.cartItem.length}</span>
                </div>
            </div>
        </header>
    )
}

export default Navbar;