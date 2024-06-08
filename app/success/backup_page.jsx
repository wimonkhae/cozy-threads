"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import OrderSummary from '@components/OrderSummary';

const Success = () => {
  const searchParams = useSearchParams();
  const session_id = searchParams.get('session_id');
  const [orderSaved, setOrderSaved] = useState(false);
  const [isOrderSummaryLoaded, setIsOrderSummaryLoaded] = useState(false);


  const handleOrderSummaryLoad = () => {
      const saveOrder = async () => {
        try {
          console.log('saving order to db');
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
              
            }),
          });
  

           // //mongoDB didn't receive all info.. try local storage
        // const orderDetails = new Map([
        //   ['cart', JSON.parse(localStorage.getItem('cart'))],
        //   ['customer', localStorage.getItem('cusId')],
        //   ['totalAmount', localStorage.getItem('totalAmount')],
        //   ['pi', localStorage.getItem('pi_id')],
        //   ['status', localStorage.getItem('pi_status')],
        //   ['created', localStorage.getItem('created')],
        // ]);

        
        //     console.log('adding to local storage');
        //     const cusId = localStorage.getItem('cusId')
        //     const existingOrders = JSON.parse(localStorage.getItem(cusId))

        //     console.log(cusId, orderDetails);

        //     const newOrderList = [];

        //     if (existingOrders) {
        //       newOrderList.push(existingOrders);
        //     } 

        //     newOrderList.push(orderDetails);
        //     console.log(newOrderList);
            
        //     localStorage.setItem(cusId, JSON.stringify(newOrderList)) 
              

          if(response.ok) {
            const res = await response.json()
            console.log("order added to DB", res);
            setOrderSaved(true);

            // clear cart after save to DB
            if(saveOrder) {
              console.log('clear cart context and local storage');
              if (typeof window !== 'undefined') {
                // localStorage.clear()
                // localStorage.removeItem("cart");
                // localStorage.removeItem("cartItemCount");
                // localStorage.removeItem("totalAmount");
                // localStorage.removeItem('pi_id');
                // localStorage.removeItem('pi_status');
                // localStorage.removeItem('receipt');
                // localStorage.removeItem('pi_amount');
                // localStorage.removeItem('created');
              }
              setCart([])
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