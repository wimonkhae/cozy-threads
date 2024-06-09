"use client";

import { Suspense, useContext, useEffect, useState } from 'react';
import OrderSummary from '@components/OrderSummary';
import Link from "next/link";
import { CartContext } from '@app/layout';

const Success = () => {
  const [isOrderSaved, setIsOrderSaved] = useState(false);
  const [session_id, setSession_id] = useState(null);
  const { setCartItemCount } = useContext(CartContext);

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  let didCancel = false;

  useEffect(() => {
    // Retrieve the session_id from the URL
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      setSession_id(urlParams.get('session_id'));

    }

    const saveOrder = async () => {
      if (!didCancel && !isOrderSaved) {
        try {
          // Add a 2-second sleep delay to wait for PI to be retreived from Stripe
          await sleep(2000);

          const response = await fetch('/api/order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: localStorage.getItem('userId'),
              cart: JSON.parse(localStorage.getItem('cart')),
              customer: localStorage.getItem('cusId'),
              totalAmount: localStorage.getItem('totalAmount'),
              pi: localStorage.getItem('pi_id'),
              status: localStorage.getItem('pi_status'),
              pi_created: localStorage.getItem('created'),
            }),
          });

          if (response.ok) {
            setIsOrderSaved(true);
            console.log('Order saved successfully', isOrderSaved);
            // clear cart after save to DB
            if (typeof window !== 'undefined') {
              localStorage.clear();
              setCartItemCount()
            }
          } else {
            const errorData = await response.json();
            console.error('Error adding order to DB:', errorData);
          }
        } catch (error) {
          console.error('Error adding order to DB:', error);
        }
      }
    };

    saveOrder();

    return () => {
      didCancel = true;
      console.log('Component unmounted', didCancel);
    };
  }, [isOrderSaved]);

  return (
    <section className="py-10 px-14">
      <h3 className="text-3xl font-bold pr-2">Payment Successful</h3>
      <h4 className="text-lg mt-4 pr-2 italic">
        Thank you for your order. We will ship your order within 1-2 business days.
      </h4>

      <div className="flex items-center">
        <Suspense fallback={<div>Loading...</div>}>
          <OrderSummary
            session_id={session_id}
            isOrderSaved={isOrderSaved}
          />
        </Suspense>
      </div>

      <div className="mt-8 flex items-center justify-between gap-1">
          <Link href="/products" className="font-bold hover:text-gray-300">
            <p className="mt-1 flex flex-col highlight_text-text items-center">Continue Shopping?</p>
          </Link>
      </div>
    </section>
  );
};

export default Success;