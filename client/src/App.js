import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthContextProvider from "./store/authContex";
import { authContext } from "./store/authContex";
import Home from "./pages/Home";
import CartContextProvider from "./store/cartContext";
import Cart from "./pages/Cart";
import PaymentScreen from "./pages/PaymentScreen";
import AddProduct from "./pages/AddProduct";
import Order from "./pages/Order";

const App = () => {
    const AppScreen = () => {
        const authCtx = useContext(authContext);
        const { isAuthenticated } = authCtx;

        console.log("user Info : " , authCtx.user);

        return (
            <Routes>
                <Route
                    path="/"
                    element={
                        isAuthenticated && authCtx.user.role == 1 ? (
                            <Navigate to="/addProduct" replace />
                        ) : isAuthenticated ? (
                            <Navigate to="/home" replace />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />

                {/* private routes... */}
                {
                    isAuthenticated &&
                    <>
                        <Route path='/home' element={<Home />} />
                        <Route path='/cart' element={<Cart />} />
                        <Route path='/payment' element={<PaymentScreen />} />
                        <Route path='/order' element={<Order />} />
                        {/* <Route path='*' element={<PageNotFound />} /> */}
                    </>
                }

                {/* public routes... */}
                {
                    !isAuthenticated &&
                    <>
                        <Route path='/login' element={<Login />} />
                        <Route path='/signup' element={<Signup />} />
                        {/* <Route path='*' element={<PageNotFound />} /> */}
                    </>
                }

                {/* admin Routes */}
                {
                    (isAuthenticated && authCtx.user.role == 1 ) && (
                        <Route path='/addProduct' element={<AddProduct/>} />
                    )
                }
            </Routes>
        )
    }

    return (
        <AuthContextProvider>
            <CartContextProvider>
                <Router>
                    <AppScreen />
                </Router>
            </CartContextProvider>
        </AuthContextProvider>
    );
};

export default App;
