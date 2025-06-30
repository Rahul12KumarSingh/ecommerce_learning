import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { Link } from "react-router-dom";
import "./ProductList.css";

const ProductList = ({ addToCart }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await api.get("/products");
            setProducts(res.data);
        };
        fetchProducts();
    }, []);

    return (
        <div className="product-list-container">
            <h2 className="product-list-title">Products</h2>
            <div className="product-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-price">₹{product.price}</p>
                        <button className="add-to-cart-button" onClick={() => {
                          addToCart(product.id)
                          alert("Product added to cart")
                        } }>
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
            <div className="checkout-container">
                <Link to="/cart" className="checkout-link">
                    Checkout the Cart
                </Link>
            </div>
        </div>
    );
};

export default ProductList;
