import React, { useEffect, useState, useContext } from 'react';
import { getAllProduct } from '../services/productServices';
import { authContext } from '../store/authContex';
import { cartContext } from '../store/cartContext';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

import { ToastContainer, toast } from 'react-toastify';

const Home = () => {

    const notify = (item) => toast.success(`${item.productName} added to cart!`);;


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

            <Navbar />


            <ToastContainer
                position="top-center"
                autoClose={2000}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />

            <div className="product-grid">
                {productList.map((item) => (
                    <div key={item._id} className="product-item">
                        <img src={item.productImg} alt={item.productName} className="product-img" />
                        <h3 className="product-name">{item.productName}</h3>
                        <p className="product-desc">{item.productDescription}</p>
                        <p className="product-price">Price: ₹{item.price}</p>
                        <button className="add-btn" onClick={() => { cartCtx.addtoCart(item); notify(item) }}>
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
