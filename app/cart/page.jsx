// pages/cart.js
"use client";

import CartSummary from '@components/CartSummary';
import ExpressCheckout from '@components/ExpressCheckout';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState, useEffect, useContext } from 'react';
import { CartContext } from '@app/layout';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Cart() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [cart, setCart] = useState([]);
  const { cusId, setCusId } = useContext(CartContext);
  
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart); 
      setCart(parsedCart);

      // Calculate the total amount
      const total = parsedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setTotalAmount(Math.round(total * 100)); // Convert to cents

      const storedCusId = localStorage.getItem('cusId')
      if (storedCusId){
        setCusId(cusId)
      }
    
    }

  }, []);
  
   const options = {
    mode: 'payment',
    amount: totalAmount,
    currency: 'usd',
    appearance: {
      variables: {
        borderRadius: '10px',
      },
    },
  }


  return (
    <section className="h-fullflex flex-col flex-1 py-10 px-14 max-w-[100%] text-center cart_bg">
      <h3 className="text-3xl font-bold pr-2 w-4/5 mx-auto mb-4">Your Cart</h3>
      <div className="items-center w-4/5 mx-auto ">
        <CartSummary />
        {/* {totalAmount > 0 && (
          <Elements stripe={stripePromise} options={options}>
            <ExpressCheckout cart={cart} />
          </Elements>
        )} */}
      </div>
    </section>
  );
}