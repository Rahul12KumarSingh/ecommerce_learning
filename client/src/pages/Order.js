import axios from 'axios';
import React, { useEffect } from 'react'
import './Order.css';
import Navbar from '../components/Navbar';

export default function Order() {
    const [orderList, setOrderList] = React.useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/order',
                    { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
                );

                console.log("Orders fetched:", response.data);
                setOrderList(response.data.orders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();

    }, []);

    return (
        <>
            <Navbar />
            <div className="order-container">
                <h1 className="order-title">Order History</h1>

                {orderList.length === 0 && <p>No orders found.</p>}

                {orderList.map((order) => (
                    <div key={order._id} className="order-card">
                        <div className="order-header">Order ID: {order._id}</div>
                        <p className="order-info">Customer Name: {order.userId.name}</p>
                        <p className="order-info">Total Amount: ₹{order.amount}</p>
                        <p className="order-info">Status: <span style={{color:'green'}}>{order.status}</span></p>
                        <p className="order-info">Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                        <p className="order-info">Order Time: {new Date(order.createdAt).toLocaleTimeString()}</p>

                        <p className="order-info">Items:</p>
                        <div className="items-container">
                            {order.items.map((item, index) => (
                                <div key={index} className="item-card">
                                    <img src={item.productImg} alt={item.productName} />
                                    <p>{item.productName}</p>
                                </div>
                            ))}
                        </div>

                        <p className="order-info">Transaction ID: {order.transactionId}</p>
                    </div>
                ))}
            </div>
        </>
    );

}
