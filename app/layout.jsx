"use client";

import "@styles/globals.css";
import Header from "@components/Header";
import Footer from "@components/Footer";
import Provider from "@components/Provider"
import { Metadata } from 'next'

import { useState, createContext, useCallback, useEffect } from "react";

export const CartContext = createContext({
  cart: [],
  clearCart: () => {},
  cusId: null,
  totalAmount: null,
  cartItemCount: null,
});

export default function RootLayout({ children }) {
  const [cusId, setCusId] = useState([]);
  const [cart, setCart, clearCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [cartItemCount, setCartItemCount] = useState(0);


  return (
    <html lang="en">
      <body>
        <Provider>
          <CartContext.Provider
            value={{
              cart,
              setCart,
              clearCart,
              cusId,
              setCusId,
              totalAmount,
              setTotalAmount,
              cartItemCount,
              setCartItemCount
            }}
          >
            <Header />
            <div className="hero"></div>
            <main className="main">{children}</main>
            <Footer />
          </CartContext.Provider>
        </Provider>
      </body>
    </html>
  );
}
