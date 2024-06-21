"use client";

import React, { useContext, useState } from 'react';
import { useStripe, useElements, ExpressCheckoutElement } from '@stripe/react-stripe-js';
import { CartContext } from '@app/layout';

const ExpressCheckout = ({ cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState();
  const { cusId } = useContext(CartContext);

  const onConfirm = async () => {

    if (!stripe) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      return;
    }

    try {
      console.log('creating PI');
      const response = await fetch('/api/create_intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          cart: cart,
          cusId: cusId
         }),
      });
      const { client_secret } = await response.json();

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret: client_secret,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_URL}/payment-success`,
        },
      });

      if (error) {
        setErrorMessage(error.message);
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  if (!stripe || !elements) {
    return null;
  }

  return (
    <div id="checkout-page" className="flex justify-end mt-4">
      <ExpressCheckoutElement onConfirm={onConfirm}/>
      {errorMessage && 
        <div className="flex mt-4">
          {errorMessage}
        </div>
      }
    </div>
  );
};

export default ExpressCheckout;