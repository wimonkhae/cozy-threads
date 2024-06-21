"use client";

import { Suspense, useContext, useEffect, useState } from 'react';
import OrderSummary from '@components/OrderSummary';
import Link from "next/link";
import { CartContext } from '@app/layout';

const Success = () => {
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
  
    if (typeof window !== 'undefined') {
    
      localStorage.removeItem("cart")
      localStorage.removeItem("cartItemCount")
      localStorage.removeItem("totalAmount")
      localStorage.removeItem("line_items");
      
      clearCart();
    }
   
  
  }, []);


  return (
    <section className="py-10 px-14">
      <h3 className="text-3xl font-bold pr-2">Payment Successful</h3>
      <h4 className="text-lg mt-4 pr-2 italic">
        Thank you for your order. We will ship your order within 1-2 business days.
      </h4>

      <div className="mt-8 flex items-center justify-between gap-1">
          <Link href="/products" className="font-bold hover:text-gray-300">
            <p className="highlight_text mt-1 flex flex-col highlight_text-text items-center">Continue Shopping?</p>
          </Link>
      </div>
    </section>
  );
};

export default Success;