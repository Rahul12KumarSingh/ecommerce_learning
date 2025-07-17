import React, { useEffect, useState } from 'react';
import BraintreeDropIn from '../components/BraintreeDropIn';

const PaymentScreen = () => {
  const [paid, setPaid] = useState(false);

  useEffect(() => {

    if (paid) {
      setTimeout(() => {
        window.location.href = '/order'; 
      }, 1000);
    }

  }, [paid])

  return (
    <div>
      <h1>Complete Your Purchase</h1>
      {!paid ? (
        <BraintreeDropIn onSuccess={() => setPaid(true)} />
      ) : (
        <>
          <h2>🎉 Payment Successful! Order placed.</h2>
        </>
      )}
    </div>
  );
};

export default PaymentScreen;
