// "use client";

// import { useContext, useState } from 'react';
import { CartContext } from '@app/layout';
import CartSummary from '@components/CartSummary';
import HostedCheckout from '@components/HostedCheckout';

export default function Cart() {

  return (
    <section className="py-10 px-14">
      <h3 className="text-3xl font-bold pr-2">Your Cart</h3>
      <div className="flex items-center">
        <CartSummary/>
      </div>
    </section>
  );
}