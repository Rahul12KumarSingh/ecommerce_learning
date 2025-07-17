import React, { useContext, useEffect, useRef, useState } from 'react';
import dropin from 'braintree-web-drop-in';
import { cartContext } from '../store/cartContext';
import { authContext } from '../store/authContex';

import { ToastContainer, toast } from 'react-toastify';


const BraintreeDropIn = ({ onSuccess }) => {
    const cartCtx = useContext(cartContext);
    const authCtx = useContext(authContext);

    const token = authCtx.token;
    const cartItems = cartCtx.cartItem;

    const [sessionId, setSessionId] = useState('');
    const [dropInInstance, setDropInInstance] = useState(null);

    const [paymentInitialized, setPaymentInitialized] = useState(false);

    const dropinContainerRef = useRef(null);

    useEffect(() => {
        const initDropin = async () => {
            try {

                const res = await fetch('http://localhost:5000/api/payment/token', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ cartItems, token }),
                });

                const data = await res.json();

                setSessionId(data.sessionId);

                const instance = await dropin.create({
                    authorization: data.clientToken,
                    container: dropinContainerRef.current,
                });

                setDropInInstance(instance);
            } catch (err) {
                console.error('Drop-in error:', err);
            }
        };

        initDropin();
    }, []);


    const handlePayment = async () => {
        if (!dropInInstance) return;

        try {
            setPaymentInitialized(true);
            const { nonce } = await dropInInstance.requestPaymentMethod();

            const res = await fetch('http://localhost:5000/api/payment/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, nonce, sessionId }),
            });

            const data = await res.json();

            if (data.success) {
                toast.success(`Payment successful!`);
                onSuccess && onSuccess(data.order);

                //make the cart empty after successful payment
                cartCtx.emptyCart();
                setPaymentInitialized(false);
            } else {
                toast.error(`Payment failed: ${data.message}`);
            }

        } catch (err) {
            toast.error(`Payment error: ${err.message}`);
        }
    };


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

            <div ref={dropinContainerRef} style={{ minHeight: 300, border: '1px solid #ccc' }} />

            {!paymentInitialized && <button onClick={handlePayment}>Pay Now</button>}
        </div>
    );
};

export default BraintreeDropIn;
