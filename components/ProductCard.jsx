"use client";

import Image from "next/image";
import { CartContext } from "@app/layout";
import { useContext, Suspense } from "react";

export default function ProductCard({ product }) {
  const { cartItemCount, setCartItemCount } = useContext(CartContext);

  //store cart in localstorage
  const addToCart = () => {
    setCartItemCount(cartItemCount + 1);

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
      const totalAmount = localStorage.getItem('totalAmount');
      if (totalAmount) {
        localStorage.setItem('totalAmount', JSON.parse(totalAmount) + product.price);
      } else {
        localStorage.setItem('totalAmount', product.price);
      }

      //update and store item count
      const cartItemCount = localStorage.getItem('cartItemCount');
      if (cartItemCount) {
        localStorage.setItem('cartItemCount', JSON.parse(cartItemCount) + 1);
      } else {
        localStorage.setItem('cartItemCount', 1);
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
          <div className="flex justify-between items-center">
            <div className="flex flex-col mr-4">
              <p className="text-sm">{product.description}</p>
              <p className="text-sm">${product.price}</p>
            </div>
            <div className="flex flex-col items-end">
              <Suspense fallback={<div>Loading...</div>}>
                <button
                  className="bg_light_green hover:bg-green-900 text-white font-bold py-2 px-3 rounded-[10px] hidden sm:inline-block"
                  onClick={addToCart}
                >
                  Add to Cart
                </button>
                <button
                  className="bg_light_green hover:bg-green-900 text-white font-bold p-2 rounded-full sm:hidden inline-block"
                  onClick={addToCart}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </button>
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}