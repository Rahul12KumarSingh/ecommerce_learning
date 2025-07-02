import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthContextProvider from "./store/authContex";
import { authContext } from "./store/authContex";
import WelcomeScreen from "./pages/WelcomeScreen";

const App = () => {
    const AppScreen = () => {
        const authCtx = useContext(authContext);
        const { isAuthenticated } = authCtx;

        return (
            <Routes>
                
                <Route
                    path="/"
                    element={
                        isAuthenticated ? (
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
                        <Route path='/home' element={<WelcomeScreen />} />
                    </>
                }

                {/* public routes... */}
                {
                    !isAuthenticated &&
                    <>
                        <Route path='/login' element={<Login />} />
                        <Route path='/signup' element={<Signup />} />
                    </>
                }
            </Routes>
        )
    }

    return (
        <AuthContextProvider>
            <Router>
                <AppScreen />
            </Router>
        </AuthContextProvider>
    );
};

export default App;
