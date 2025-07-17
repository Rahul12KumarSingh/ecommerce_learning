import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import "./Signup.css";
import { register } from "../services/authServices";
import { authContext } from "../store/authContex";
import { useContext } from "react";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';


const Signup = () => {
    const authCtx = useContext(authContext);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [password, setPassword] = useState("");

    //generating the pressigned url for image upload
    const uploadToAws = async (file) => {
        let fileName = file.name;
        let fileType = file.type;

        try {
            const response = await axios.post("https://ecommerce-learning-1.onrender.com/api/cloudService/getSignedUrl", {
                fileName,
                fileType,
            });

            const url = response.data.url;
            fileName = response.data.fileName;

            await axios.put(url, file, {
                headers: {
                    "Content-Type": fileType,
                },
            });

            const cloudfrontDomain = "https://d2me721pzztcbb.cloudfront.net";
            const publicUrl = `${cloudfrontDomain}/${fileName}`;

            setProfileImage(publicUrl);
        }
        catch (error) {
            console.error("Error getting presigned URL:", error);
        }
    }


    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name,
            email,
            password,
            profileImage: profileImage
        };

        const data = await register(payload);
        
        if (!data) {
            alert("signup failed....");
            return;
        }

        authCtx.authenticate(data.user, data.token);
        toast.success("Signup successful!");
        navigate("/home");
    };

    //designing part.....
    return (
        <div className="signup-container">


            <ToastContainer
                position="top-center"
                autoClose={2000}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />

            <h2 className="signup-title">Signup</h2>

            <form className="signup-form" onSubmit={handleSubmit}>
                <input className="signup-input" type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required />

                <input className="signup-input" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />

                <input className="signup-input" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />

                {/* // File upload input */}
                <input className="signup-input" type="file" accept="image/*" onChange={(e) => {
                    const file = e.target.files[0];
                    uploadToAws(file)
                }} />

                <button className="signup-button" type="submit">Signup</button>
            </form>

            <p className="login-link">
                Already have an account? <a href="/login">Login</a>
            </p>

        </div>
    );
};

export default Signup;
