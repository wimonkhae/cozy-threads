"use client";


import Link from 'next/link';

const Refund = () => {

  return (
    <section className="h-fullflex flex-col flex-1 py-10 px-14 max-w-[100%] text-center cart_bg">

      <h3 className="text-3xl font-bold pr-2 w-4/5 mx-auto mb-4">Refund Successful</h3>
       
       <Link href="/products" className="highlight_text hover:text-gray-300">
         <p className="my-3 flex flex-col text-lg italic font-bold">Continue Shopping?</p>
       </Link>


  </section>
  );
};

export default Refund;


