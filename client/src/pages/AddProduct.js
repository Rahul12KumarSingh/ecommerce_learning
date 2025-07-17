
import React, { useState } from 'react';
import './AddProduct.css';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';

const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productImg, setProductImg] = useState('');

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

            setProductImg(publicUrl);
        }
        catch (error) {
            console.error("Error getting presigned URL:", error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            productName,
            price,
            productDescription,
            productImg
        };

        try {
            const response = await axios.post('https://ecommerce-learning-1.onrender.com/api/products/add', payload, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            toast.success(`${productName} added successfully!`);

            setProductName('');
            setPrice('');
            setProductDescription('');
            setProductImg('');
        } catch (error) {
            console.error("Error adding product:", error);
            toast.error("Error adding product : " + error.message);
            return;
        }
    }



    return (
        <div>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />

            <h1>Admin Portal</h1>
            <h2 className="title">Add Product</h2>

            <form className="form" onSubmit={handleSubmit}>
                <input className="form-input" type="text" value={productName} placeholder="Product Name" onChange={(e) => setProductName(e.target.value)} required />

                <input className="form-input" type="text" value={price} placeholder="Price" onChange={(e) => setPrice(e.target.value)} required />

                {/* <input className="form-input" type="text" placeholder="Product Description" onChange={(e) => setProductDescription(e.target.value)} required /> */}

                <input
                    className="form-input"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                            uploadToAws(file);
                        }
                    }}
                />

                {productImg && <img src={productImg} alt="Uploaded Preview" className="image-preview" />}

                <button className="form-button" type="submit">Add Product</button>
            </form>
        </div>

    );
}



export default AddProduct;

