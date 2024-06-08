"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import OrderSummary from '@components/OrderSummary';

const Success = () => {
  const searchParams = useSearchParams();
  const session_id = searchParams.get('session_id');
  const [orderSaved, setOrderSaved] = useState(false);
  const [isOrderSummaryLoaded, setIsOrderSummaryLoaded] = useState(false);

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleOrderSummaryLoad = () => {
   
    const saveOrder = async () => {
      await sleep(2000);
      try {
        const response = await fetch('/api/order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: localStorage.getItem('userId'),
            cart: JSON.parse(localStorage.getItem('cart')),
            customer: localStorage.getItem('cusId'),
            totalAmount: localStorage.getItem('totalAmount'),
            pi: localStorage.getItem('pi_id'),
            status: localStorage.getItem('pi_status'),
            pi_created: localStorage.getItem('created'),
            
          }),
        });

      if(response.ok) {
        const res = await response.json()
        // clear cart after save to DB
        if (typeof window !== 'undefined') {
          localStorage.clear()
        }
  
      } else {
        const errorData = await response.json();
        console.error('Error adding order to DB:', errorData);
      }
      
      } catch (error) {
        console.error('Error adding order to DB:', error);
      }
    }
    saveOrder();
  }

useEffect(() => {
  handleOrderSummaryLoad();
}, []);

    
  return (
    <section className="py-10 px-14">
      <h3 className="text-3xl font-bold pr-2">Payment Successful</h3>
      <h4 className="text-lg mt-4 pr-2 italic">
        Thank you for your order. We will ship your order within 1-2 business days.
      </h4>

      <div className="flex items-center">
        <OrderSummary 
          session_id={session_id}
          // onLoad={() => setIsOrderSummaryLoaded(true)}
          onLoad={handleOrderSummaryLoad}
        />
      </div>
    </section>
  );
};

export default Success;