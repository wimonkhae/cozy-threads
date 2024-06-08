"use client";

import { useContext, useState } from 'react';
import { CartContext } from '@app/layout';
import Cart from '@components/CartSummary';
import EmbededCheckout from '@components/backup_EmbededCheckout';

export default function Checkout() {
  const { setCheckedOut } = useContext(CartContext);
  const [isCheckoutComplete, setIsCheckoutComplete] = useState(false);
  const [showEmbededCheckout, setShowEmbededCheckout] = useState(false);

  const handleCheckoutComplete = () => {
    setCheckedOut(true);
    setIsCheckoutComplete(true);
    // Add any additional logic, such as clearing the cart
  };

  const handleProceedToCheckout = () => {
    setShowEmbededCheckout(true);
  };

  return (
    <section className="py-10 px-14">
      <h3 className="text-3xl font-bold pr-2">Cart</h3>
      <div className="flex items-center">
        {!showEmbededCheckout && <Cart onProceedToCheckout={handleProceedToCheckout} />}
      </div>

      {showEmbededCheckout && (
        <div>
          <h3 className="text-3xl font-bold pr-2 mt-8">Checkout</h3>
          <div id="checkout">
            <EmbededCheckout onCheckoutComplete={handleCheckoutComplete} />
          </div>
        </div>
      )}

      {isCheckoutComplete && (
        <div className="mt-8 flex items-center justify-between gap-1">
          <p>Thank you for your order!</p>
        </div>
      )}
    </section>
  );
}