import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { api } from "./services/api";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);
    const [totalPrice, settotalPrice] = useState(0);
    const [disCountPrice, setdisCountPrice] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchCart();
        }
    }, [user]);

    const fetchCart = async () => {
        const res = await api.get(`/cart/${user?.id}`);
        setCart(res.data.cartItems);
        settotalPrice(res.data.total);
        setdisCountPrice(res.data.discountedTotal);
    };

    const addToCart = async (productId) => {
        if (!user) return alert("Please login first!");
        await api.post("/cart/add", { userId: user.id, productId, quantity: 1 });
        fetchCart();
    };

    const removeFromCart = async (productId) => {
        await api.post("/cart/remove", { userId: user.id, productId });
        fetchCart();
    };

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login setUser={setUser} />} />
                <Route path="/signup" element={<Signup />} />
                
                {/* Redirect first-time visitors to login */}
                <Route path="/" element={user ? <ProductList addToCart={addToCart} /> : <Navigate to="/login" />} />
                
                {/* Private Route for Cart */}
                <Route path="/cart" element={ user && <Cart cart={cart} 
                 disCountPrice={disCountPrice} totalPrice={totalPrice}
                removeFromCart={removeFromCart} />} />
            </Routes>
        </Router>
    );
};

export default App;
