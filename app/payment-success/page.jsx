"use client";

import { useContext, useEffect, useState } from 'react';
import Link from "next/link";
import { CartContext } from '@app/layout';
import formatCurrency from '@utils/formatCurrency';
import Image from 'next/image';

const PaymentSuccess = () => {
  const { clearCart } = useContext(CartContext);
  const [isOrderSaved, setIsOrderSaved] = useState(false);
  const [orderSavedError, setOrderSavedError] = useState(false);
  const [paymentIntent, setPaymentIntent] = useState(null);

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  useEffect(() => {
    const retrievePaymentIntent = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const pi_id = urlParams.get('payment_intent');

        if (pi_id) {
          const response = await fetch(`/api/payments/${pi_id}`);

          if (response.ok) {
            const pi = await response.json();

            // Manipulate date to human-readable format
            pi.created = new Date(pi.created * 1000).toDateString();

            // Convert amount to a number
            pi.amount = parseFloat(pi.amount) / 100;

            setPaymentIntent(pi);
          } else {
            const errorData = await response.json();
            console.error('Error getting PI:', errorData);
          }
        } else {
          console.error('No payment_intent query parameter found in the URL.');
        }
      } catch (error) {
        console.error('Error retrieving payment intent:', error);
      }
    };

    retrievePaymentIntent();

    if (!isOrderSaved && !orderSavedError && paymentIntent) {
      const saveOrder = async () => {
        try {
          // Add a 2-second sleep delay to wait for PI to be retrieved from Stripe
          await sleep(2000);

          const response = await fetch('/api/create_order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: localStorage.getItem('userId'),
              cart: JSON.parse(localStorage.getItem('cart')),
              customer: localStorage.getItem('cusId'),
              totalAmount: paymentIntent.amount,
              pi: paymentIntent.id,
              status: paymentIntent.status,
              pi_created: paymentIntent.created,
              receipt: paymentIntent.latest_charge.receipt_url,
            }),
          });

          if (response.ok) {
            setIsOrderSaved(true);
            // Clear cart after save to DB
            if (typeof window !== 'undefined') {
              localStorage.removeItem("cart");
              localStorage.removeItem("cartItemCount");
              localStorage.removeItem("totalAmount");
              localStorage.removeItem("line_items");
              clearCart();
            }
          } else {
            const errorData = await response.json();
            console.error('Error adding order to DB:', errorData);
            setOrderSavedError(true);
          }
        } catch (error) {
          console.error('Error adding order to DB:', error);
          setOrderSavedError(true);
        }
      };

      saveOrder();
    }
  }, [isOrderSaved, orderSavedError, paymentIntent, clearCart]);

  return (
    <section className="py-10 px-14">
      <h3 className="text-3xl font-bold pr-2">Payment Summary</h3>
      <h4 className="text-lg mt-4 pr-2 italic mb-4">
        Thank you for your order. We will ship your order within 1-2 business days.
      </h4>

      <div className="flex items-center">
        <div className="flex item-center">
          <Image
            className="flex pr-3"
            src="../icons/orders.svg"
            alt="orders"
            width={50}
            height={50}
          />
          <h3 className="flex text-lg font-bold pt-2">Order Summary</h3>
        </div>
      </div>

      {paymentIntent && (
        <div className="text-sm mt-4">
          <p>Payment ID: {paymentIntent.id}</p>
          <p>Purchase Date: {paymentIntent.created}</p>
          <p>Status: {paymentIntent.latest_charge?.status ? paymentIntent.latest_charge?.status : paymentIntent.status}</p>
          <p>User: {paymentIntent.customer ? paymentIntent.customer : 'Guest'}</p>
          <p>
            Receipt:{' '}
            {paymentIntent.latest_charge?.receipt_url ? 
              <a
                className="underline hover:text-gray-300"
                href={paymentIntent.latest_charge.receipt_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Link
              </a>
              
              : 'Not Available'
            }
            </p>
        </div>
      )}

      <div className="mt-8 flex items-center justify-between gap-1">
        <Link href="/products" className="font-bold hover:text-gray-300">
          <p className="highlight_text mt-1 flex flex-col highlight_text-text items-center">
            Continue Shopping?
          </p>
        </Link>
      </div>
    </section>
  );
};

export default PaymentSuccess;