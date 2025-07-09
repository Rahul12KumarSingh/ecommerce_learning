import React, { useEffect, useState, useContext } from 'react';
import { getAllProduct } from '../services/productServices';
import { authContext } from '../store/authContex';
import { cartContext } from '../store/cartContext';
import './Home.css'; 
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const [productList, setProductList] = useState([]);
    const cartCtx = useContext(cartContext);
    const authCtx = useContext(authContext);

    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getAllProduct();
            setProductList(data);
        };

        fetchProducts();
    }, []);

    return (
        <div className="home-container">
            <header className="home-header">
                <div className="user-info">
                    Welcome, <span className="username">{authCtx.user.name}</span>
                </div>
                <div className="cart-info"
                    onClick={() => navigate('/cart')} 
                    style={{ cursor: 'pointer' }} 
                >
                    🛒 Cart Items: <span className="cart-count">{cartCtx.cartItem.length}</span>
                </div>
            </header>

            <div className="product-grid">
                {productList.map((item) => (
                    <div key={item._id} className="product-item">
                        <img src={item.productImg} alt={item.productName} className="product-img" />
                        <h3 className="product-name">{item.productName}</h3>
                        <p className="product-desc">{item.productDescription}</p>
                        <p className="product-price">Price: ₹{item.price}</p>
                        <button className="add-btn" onClick={() => cartCtx.addtoCart(item)}>
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
