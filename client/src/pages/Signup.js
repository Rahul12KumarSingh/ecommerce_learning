import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import "./Signup.css";
import { register } from "../services/authServices";

import { authContext } from "../store/authContex";
import { useContext } from "react";

const Signup = () => {
    const authCtx = useContext(authContext) ;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

          const payload = {
                name,
                email,
                profileImage ,
                password,
            };
     
            const data = await register(payload);
            console.log("signup data : " , data);

            if(!data){
                alert("signup failed....");
                return ;
            }
        
            console.log("signup response data : ", data);

            authCtx.authenticate(data.user , data.token) ;
            navigate("/home");
    };

    //designing part.....
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
