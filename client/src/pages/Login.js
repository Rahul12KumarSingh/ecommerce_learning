import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, setAuthToken } from "../services/api";
import "./Login.css";
import { login } from "../services/authServices";
import { authContext } from "../store/authContex";
import { useContext } from "react";

const Login = () => {
    const authCtx = useContext(authContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            email,
            password,
        };

        const data = await login(payload);

        if (!data) {
            return;
        }
        console.log("login response data : ", data); 
        authCtx.authenticate(data.user , data.token);
        navigate("/home");
    };

    //designing part....
    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <input className="login-input" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                <input className="login-input" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                <button className="login-button" type="submit">Login</button>
            </form>
            <p className="signup-link">
                Don't have an account? <a href="/signup">Signup</a>
            </p>
        </div>
    );
};

export default Login;
