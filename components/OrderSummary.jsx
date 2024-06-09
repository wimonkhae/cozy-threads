"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import Link from "next/link";
import OrderItems from "./OrderItems";

const OrderSummary = () => {

  const searchParams = useSearchParams();
  const session_id = searchParams.get('session_id');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`/api/checkout_sessions?session_id=${session_id}`);
        if (response.ok) {
          const data = await response.json();
          if (typeof window !== 'undefined') {
            localStorage.setItem("pi_id", data.id)
            localStorage.setItem("pi_status", data.status)
            localStorage.setItem("pi_amount", data.amount)
            localStorage.setItem("receipt", data.recieptUrl)
            localStorage.setItem("created", data.created )

          }
          setOrder(data);
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Error fetching order details.');
        }
      } catch (error) {
        setError('An error occurred while fetching the order details.');
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [session_id]);

  if (error) {
    return <div className="mt-4">Error: {error}</div>;
  }

  if (!order) {
    return <div className="mt-4">Loading order details...</div>;
  }

  return (
    <section className="mt-4">
      <div className="flex item-center">
        <Image
          className="flex pr-3"
          src="../icons/orders.svg" alt="orders" width={50} height={50} 
        />
        <h3 className="flex text-lg font-bold pt-2">Order Summary</h3>
      </div>
      <div className="text-sm mt-4">
        <p>Payment ID: {order.id}</p>
        <p>Purchase Date: {order.created}</p>
        <p>Status: {order.status}</p>
        <p>User: {order.customer} </p>
        <p>Receipt:  <a className="underline hover:text-gray-300" href={order.recieptUrl} target="_blank" rel="noopener noreferrer" > Link</a> </p> 
        <OrderItems data={order} />
        <p className="text-base font-bold mt-2">Total Amount: {order.amount}</p>
      </div>

    </section>
  );
};

export default OrderSummary;