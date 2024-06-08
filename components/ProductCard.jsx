"use client";

import Image from "next/image";
import { CartContext } from "@app/layout";
import { useContext, useEffect } from "react";


export default function ProductCard({ product }) {
  const {cartItemCount, setCartItemCount} = useContext(CartContext);

  //store cart in localstorage
  const addToCart = () => {
    
    setCartItemCount(cartItemCount +1)

    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart');
      let updatedCart = [];
  
      //update and store cart items
      if (storedCart) {
        updatedCart = JSON.parse(storedCart);
        const existingItem = updatedCart.find((item) => item.id === product.id);
        if (existingItem) {
          existingItem.quantity++;
        } else {
          product.quantity = 1;
          updatedCart.push(product);
        }
      } else {
        product.quantity = 1;
        updatedCart = [product];
      }
  
      localStorage.setItem('cart', JSON.stringify(updatedCart));

      //update and store cart total amount
      const totalAmount = localStorage.getItem('totalAmount')
      if (totalAmount) {
        localStorage.setItem('totalAmount', JSON.parse(totalAmount) + product.price)
      } else {
        localStorage.setItem('totalAmount', product.price)
      }
      
      //update and store item count
      const cartItemCount = localStorage.getItem('cartItemCount')
      if (cartItemCount){
        localStorage.setItem('cartItemCount', JSON.parse(cartItemCount)+1 )
      } else {
        localStorage.setItem('cartItemCount', 1)
      }
    }
  };



  return (
    <div className="border p-6 flex flex-col items-center">
      <div className="w-[180px] mb-4">
        <Image
          src={product.image}
          alt={product.name}
          width={180}
          height={230}
          className="h-[230px] w-[180px] object-contain"
        />
      </div>

      <div className="w-full ">
        <h2 className="text-base font-bold mt-1 mb-2">{product.name}</h2>
        <div className="flex flex-col justify-center"> 
        <div className="flex justify-between">
          
          <div  className="flex flex-col mr-4"> 
            <p className="text-sm">{product.description}</p>
            <p className="text-sm">${product.price}</p>
          </div>
          <div className="flex flex-col items-end">
            <button className="bg_light_green hover:bg-green-900 text-white font-bold py-2 px-3 rounded-[10px]"
              onClick={addToCart}>
              Add to Cart
            </button>

          </div>
        </div>
        </div>
      </div>
    </div>
  );
}