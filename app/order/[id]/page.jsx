"use client";

import { Suspense, useEffect, useState } from 'react';
import Link from "next/link";
import Image from 'next/image';

const Order = ({ params }) => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const retrieveOrder = async () => {
      try {
        const response = await fetch(`/api/order/${params.id}`);

        if (response.ok) {
          const order = await response.json();
          setOrderDetails(order)
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Error fetching user order")
        }
      } catch (error) {
        console.error('Error retrieving order:', error);
        setError('An error occurred while fetching the user order');
      }
    }
    retrieveOrder()
  }, [params.id]);

  return (
    <section className="py-10 px-14 max-w-[100%] text-center mb-2">
      <h3 className="text-3xl font-bold pr-2">My Order</h3>

      <div className="mt-10 px-2">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="mt-4 mb-4 mx-auto">
            <Image
              className="text-transparent mb-4 mx-auto"
              src="../icons/orders.svg" alt="orders" width={80} height={80} 
            />
            <div className="mb-6 text-center">
              <h4 className="font-bold mb-2">Order Details</h4>
              {error ? (
                <div>Error: {error}</div>
              ) : (
                  <div className={`bg-white p-4 border-t-4 border-gray-50 rounded-md shadow-md sm:flex-row items-center justify-between ${orderDetails ? 'sm:max-w-[45%] mx-auto sm:border-t-2' : ''}`}>                  
                  <div className="text-center text-sm mt-4 sm:text-base sm:mt-0 sm:w-full">
                    {orderDetails && (
                      <>
                        <p className="sm:truncate">Payment ID: {orderDetails.paymentIntent}</p>
                        <p className="sm:truncate">Purchase Date: {orderDetails.pi_created}</p>
                        <p className="sm:truncate">Status: {orderDetails.status}</p>
                        <p className="sm:truncate">User: {orderDetails.cusId} </p>
                        <p className="sm:truncate">Receipt:  <a className="underline hover:text-gray-300" href={orderDetails.recieptUrl} target="_blank" rel="noopener noreferrer" > Link</a> </p>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Suspense>
      </div>

      <div className="mt-8 flex items-center justify-center">
        <Link href="/products" className="font-bold hover:text-gray-300">
          <p className="highlight_text mt-1 flex flex-col highlight_text-text items-center">Continue Shopping?</p>
        </Link>
      </div>
    </section>
  );
};

export default Order;