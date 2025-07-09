import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import "./Signup.css";
import { register } from "../services/authServices";
import { authContext } from "../store/authContex";
import { useContext } from "react";

const Signup = () => {
    const authCtx = useContext(authContext);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [password, setPassword] = useState("");


    //generating the pressigned url for image upload
    const uploadToAws = async (file) => {
        const fileName = file.name;
        const fileType = file.type;

        try {
            const response = await api.post("/auth/presigned-url", {
                fileName,
                fileType,
            });

            if (response.status === 200) {
                const { url } = response.data;
                await fetch(url, {
                    method: "PUT",
                    body: file,
                    headers: {
                        "Content-Type": fileType,
                    },
                });
               setProfileImage(url.split("?")[0]) ; 
            }
           
        } catch (error) {
            console.error("Error getting presigned URL:", error);
            throw error;
        }
    }


    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();


        const payload = {
            name,
            email,
            profileImage,
            password,
            profileImage: profileImage 
        };

        const data = await register(payload);
        console.log("signup data : ", data);

        if (!data) {
            alert("signup failed....");
            return;
        }

        authCtx.authenticate(data.user, data.token);
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

                {/* // File upload input */}
                <input className="signup-input" type="file" accept="image/*" onChange={(e) => {
                    const file = e.target.files[0];
                    uploadToAws(file)
                }} required />

                <button className="signup-button" type="submit">Signup</button>
            </form>

            <p className="login-link">
                Already have an account? <a href="/login">Login</a>
            </p>

        </div>
    );
};

export default Signup;
