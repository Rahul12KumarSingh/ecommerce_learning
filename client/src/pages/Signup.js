import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import "./Signup.css";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/auth/register", { name, email, password });
            alert("Signup successful! Please login.");
            navigate("/login"); // Redirect to login page after signup
        } catch (error) {
            alert(error.response?.data?.error || "Signup failed.");
        }
    };

    return (
        <div className="signup-container">
            <h2 className="signup-title">Signup</h2>
            <form className="signup-form" onSubmit={handleSubmit}>
                <input className="signup-input" type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
                <input className="signup-input" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                <input className="signup-input" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                <button className="signup-button" type="submit">Signup</button>
            </form>
            <p className="login-link">
                Already have an account? <a href="/login">Login</a>
            </p>
        </div>
    );
};

export default Signup;
