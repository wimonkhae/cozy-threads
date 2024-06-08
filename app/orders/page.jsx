"use client";
import OrderCard from "@components/OrderCard";
import Image from "next/image";
import Link from "next/link";

const Orders = () => {
  
 
  return (
    <section className="py-10 px-14">
      <h3 className="text-3xl font-bold pr-2">Purchase History</h3>
      <div className="mt-10 px-2">
        <Image
          className="mb-4 ml-1"
          src="../icons/orders.svg" alt="orders" width={80} height={80} 
        />
         <div className="ml-4 mb-4">
            <h4 className="font-bold mb-2">My Orders</h4>
            <OrderCard />
          </div>
    
      </div>
    </section>
  )
}


export default Orders