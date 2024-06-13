"use client";

import CartSummary from '@components/CartSummary';
import Link from 'next/link';

const Cancel = () => {

  return (
    <section className="h-fullflex flex-col flex-1 py-10 px-14 max-w-[100%] text-center cart_bg">

      <h3 className="text-3xl font-bold pr-2 w-4/5 mx-auto mb-4">Your Cart</h3>
       
       <Link href="/products" className="highlight_text hover:text-gray-300">
         <p className="my-3 flex flex-col text-lg italic font-bold">Forgetting Somthing?</p>
       </Link>

      <div className="items-center w-4/5 mx-auto">
        <CartSummary/>
      </div>
  </section>
  );
};

export default Cancel;


