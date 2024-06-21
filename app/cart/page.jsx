"use client";

import CartSummary from '@components/CartSummary';
import ExpressCheckout from '@components/ExpressCheckout';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
const options = {};
export default function Cart() {

  return (
    <section className="h-fullflex flex-col flex-1 py-10 px-14 max-w-[100%] text-center cart_bg">
      <h3 className="text-3xl font-bold pr-2 w-4/5 mx-auto mb-4">Your Cart</h3>
      <div className="items-center w-4/5 mx-auto ">
        <CartSummary/>
        <Elements stripe={stripePromise} options={options}>

          <ExpressCheckout />
        </Elements>
      </div>
    </section>
  );
}