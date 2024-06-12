"use client";

import "@styles/globals.css";
import Header from "@components/Header";
import Footer from "@components/Footer";
import Provider from "@components/Provider";

import { useState, createContext, useCallback, useEffect } from "react";

export const CartContext = createContext({
  cart: [],
  clearCart: () => {},
  cusId: null,
  totalAmount: null,
  cartItemCount: null,
  productData: null,
  setProductData: () => {},
  featuredProducts: null,
  setFeaturedProducts: () => {},
});

export default function RootLayout({ children }) {
  const [cusId, setCusId] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [productData, setProductData] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  return (
    <html lang="en">
      <body>
        <Provider>
          <CartContext.Provider
            value={{
              cart,
              setCart,
              clearCart: () => {
                setCart([]);
                setTotalAmount(0);
                setCartItemCount(0);
              },
              cusId,
              setCusId,
              totalAmount,
              setTotalAmount,
              cartItemCount,
              setCartItemCount,
              productData,
              setProductData,
              featuredProducts,
              setFeaturedProducts,
            }}
          >
            <Header />
            {/* <div className="hero"></div> */}
            <main className="main">{children}</main>
            <Footer />
          </CartContext.Provider>
        </Provider>
      </body>
    </html>
  );
}