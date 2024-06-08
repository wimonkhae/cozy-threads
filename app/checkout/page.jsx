"use client";

import { useState } from 'react';

import EmbededCheckout from '@components/backup_EmbededCheckout';

export default function Checkout() {
  const [isCheckoutComplete, setIsCheckoutComplete] = useState(false);

  const handleCheckoutComplete = () => {
    setCheckedOut(true);
    setIsCheckoutComplete(true);
    // Add any additional logic, such as clearing the cart
  };


  return (
    <section className="py-10 px-14">
        <div>
          <h3 className="text-3xl font-bold pr-2 mt-8">Checkout</h3>
          <div id="checkout">
            <EmbededCheckout />
          </div>
        </div>
    </section>
  );
}