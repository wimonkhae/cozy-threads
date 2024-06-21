"use client";
import { useEffect, useRef, useState } from 'react';
import { useStripe, useElements, ExpressCheckoutElement } from '@stripe/react-stripe-js';

const CheckoutPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState();
  const expressCheckoutRef = useRef(null);

  useEffect(() => {
    const totalAmount = localStorage.getItem('totalAmount')

    if (stripe && elements && expressCheckoutRef.current) {
      const expressCheckoutElement = elements.create("expressCheckout", {
        paymentRequest: stripe.paymentRequest({
          country: "US",
          currency: "usd",
          total: {
            label: "Total",
            amount: Number(totalAmount), // Same amount as in the backend
          },
          requestPayerName: true,
          requestPayerEmail: true,
        }),
      });

      expressCheckoutElement.mount(expressCheckoutRef.current);

      expressCheckoutElement.on('confirm', async (event) => {
        const { error, paymentIntent } = event;
        if (error) {
          setErrorMessage(error.message);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
          console.log('Payment Success!');
        }
      });
    }
  }, [stripe, elements]);

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
      const response = await fetch('/api/create-intent', {
        method: 'POST',
       
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(amount, totalAmount)
      });
      const { client_secret } = await response.json();

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret: client_secret,
        confirmParams: {
          return_url: 'http://localhost:3000/success',
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
    <div id="checkout-page">
        EXPRESS CHECKOUT
      <div ref={expressCheckoutRef}></div>
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
};

export default CheckoutPage;