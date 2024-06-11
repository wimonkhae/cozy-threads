// "use client";

import CartSummary from '@components/CartSummary';


export default function Cart() {

  return (
    <section className="py-10 px-14 cart_bg">
      <h3 className="text-3xl font-bold pr-2 w-4/5 mx-auto mb-4">Your Cart</h3>
      <div className="flex items-center w-4/5 mx-auto ">
        <CartSummary/>
      </div>
    </section>
  );
}