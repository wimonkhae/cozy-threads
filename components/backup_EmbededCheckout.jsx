"use client";

import React, { useState, useCallback, useContext, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { CartContext } from '@app/layout';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function EmbededCheckout() {
  const { cart } = useContext(CartContext);
  const [clientSecret, setClientSecret] = useState(null);
  const [error, setError] = useState(null);

  const line_items = cart.reduce((acc, item) => {
    const existingItem = acc.find(i => i.price === item.price_id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      acc.push({ price: item.price_id, quantity: 1 });
    }
    return acc;
  }, []);

  const fetchClientSecret = useCallback(async () => {
    try {
      // Create a Checkout Session
      const response = await fetch("/api/checkout", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ line_items }),
      });

      if (response.ok) {
        const data = await response.json();

        setClientSecret(data.clientSecret);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'An error occurred while creating the checkout session.');
      }
    } catch (err) {
      setError('An error occurred while creating the checkout session. Please try again later.');
    }
  }, [line_items]);

  useEffect(() => {
    fetchClientSecret();
  }, [fetchClientSecret]);

  if (!clientSecret) {
    return <div>Loading the checkout session...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const options = { clientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}