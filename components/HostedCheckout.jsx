"use client";

import React, { useState, useCallback, useContext, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/navigation';
import { CartContext } from '@app/layout';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function HostedCheckout() {
  const { cart } = useContext(CartContext);
  const [error, setError] = useState(null);
  const router = useRouter();

  const line_items = cart.reduce((acc, item) => {
    const existingItem = acc.find(i => i.price === item.price_id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      acc.push({ price: item.price_id, quantity: 1 });
    }
    return acc;
  }, []);

  const handleCheckout = useCallback(async () => {
    try {
      // Create a Checkout Session
      const response = await fetch("/api/checkout_sessions", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ line_items }),
      });

      if (response.ok) {
        const { id: sessionId } = await response.json();
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId });
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'An error occurred while creating the checkout session.');
      }
    } catch (err) {
      setError('An error occurred while creating the checkout session. Please try again later.');
    }
  }, [line_items, stripePromise]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <form onSubmit={handleCheckout}>
      <button type="submit">Checkout</button>
    </form>
  );
}