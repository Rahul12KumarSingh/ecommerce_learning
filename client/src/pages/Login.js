import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, setAuthToken } from "../services/api";
import "./Login.css";

const Login = ({ setUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/login", { email, password });

            console.log(res.data);
            
            setAuthToken(res.data.token);
            setUser(res.data.user);

            navigate("/"); // Redirect to home page after login
        } catch (error) {
            alert(error.response?.data?.error || "Login failed.");
        }
    };

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
