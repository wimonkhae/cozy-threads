"use client";

import CartSummary from '@components/CartSummary';
import Link from 'next/link';

const Cancel = () => {

  return (
    <section className="py-10 px-14">

      <h3 className="text-3xl font-bold pr-2">Your Cart</h3>
       
       <Link href="/products" className="highlight_text hover:text-gray-300">
         <p className="my-3 flex flex-col text-lg italic font-bold">Forgetting Somthing?</p>
       </Link>

      <div className="flex items-center">
        <CartSummary/>
      </div>
  </section>
  );
};

export default Cancel;


