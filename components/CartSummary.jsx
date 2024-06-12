"use client";

import { useContext, useEffect, useState } from 'react';
import { CartContext } from '@app/layout';
import Link from "next/link";
import Image from "next/image";
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CartSummary = () => {

  const { 
    cart, 
    setCart, 
    cusId, 
    setCusId, 
    totalAmount, 
    setTotalAmount, 
    cartItemCount, 
    setCartItemCount
  } = useContext(CartContext);

  const [quantity, setQuantity] = useState(0);


  const handleQuantityChange = (itemId, currQty, newQty) => {
    if (typeof window !== 'undefined') {
      const localCart = JSON.parse(localStorage.getItem('cart'));
      const cartItemCount = JSON.parse(localStorage.getItem('cartItemCount'));
      const totalAmount = JSON.parse(localStorage.getItem('totalAmount'));

      const updateCart = localCart
      const existingItem = localCart.find((item) => item.id === itemId);

      // Update quantity
      if (existingItem) {
        existingItem.quantity = newQty;
      }
      localStorage.setItem('cart', JSON.stringify(localCart));

      // Update and store item count & total amount
      const diffQty = newQty - currQty;
      localStorage.setItem('cartItemCount', cartItemCount + diffQty);
      localStorage.setItem('totalAmount', totalAmount + (existingItem.price * diffQty));

      // Update the cart state
      setCart([...localCart]);
      setCartItemCount(cartItemCount + diffQty);
      setTotalAmount(totalAmount + (existingItem.price * diffQty));
    }
  };

  const handleRemoveItem = (itemId) => {
    if (typeof window !== 'undefined') {
      const localCart = JSON.parse(localStorage.getItem('cart'));
      const cartItemCount = JSON.parse(localStorage.getItem('cartItemCount'));
      const totalAmount = JSON.parse(localStorage.getItem('totalAmount'));

      const updatedCart = localCart.filter((item) => item.id !== itemId);
      const removedItem = localCart.find((item) => item.id === itemId);

      localStorage.setItem('cart', JSON.stringify(updatedCart));
      localStorage.setItem('cartItemCount', cartItemCount - removedItem.quantity);
      localStorage.setItem('totalAmount', totalAmount - (removedItem.price * removedItem.quantity));

      setCart(updatedCart);
      setCartItemCount(cartItemCount - removedItem.quantity);
      setTotalAmount(totalAmount - (removedItem.price * removedItem.quantity));
      
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localCart = JSON.parse(localStorage.getItem('cart'))
      const cartItemCount = JSON.parse(localStorage.getItem('cartItemCount'));
      const totalAmount = JSON.parse(localStorage.getItem('totalAmount'));
      const cusID = localStorage.getItem("cusId");

      if (!cusId) { 
        setCusId(cusID) 
      }
      setCart(localCart)
      setCartItemCount(cartItemCount)
      setTotalAmount(totalAmount)
    }
  }, []);


  const onProceedToCheckout = async () => {

    //build line_items for checkout session
    console.log('checkout cart', cart);

    let line_items = []
  
    cart.map((it) => {
      let item = {
        price: it.price_id,
        quantity: it.quantity,
      };
      line_items.push(item);
    });
    new Map()

    try {
      // Create a Checkout Session
      console.log("line_items", line_items);
      console.log('cusid', cusId)

      const response = await fetch("/api/checkout_sessions", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          line_items,
          customer: cusId,
        }),
      });

      if (response.ok) {
        const { id: sessionId } = await response.json();
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId });
      } else {
        const errorData = await response.json();
        console.error('Error creating Stripe checkout session:', errorData);
        alert('Error creating Stripe checkout session. Please log in and try again.');
      }
    } catch (error) {
      console.error('Error creating Stripe checkout session:', error);
      alert('Error creating Stripe checkout session. Please log in and try again later.');
    }

  }

  return (
    <section className="mx-auto">
      {cart && totalAmount > 0 ? (
        <div className="w-[100%]">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
            {[...cart].map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-md shadow-md flex flex-col sm:flex-row items-center justify-between"
              >
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-md mr-10"
                  />
                  <div className="space-x10 flex flex-col ">
                    <h3 className="text-lg font-bold">{item.name}</h3>
                    <p className="text-gray-500">${item.price}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 sm:mt-0 w-full sm:w-auto">
                  <div className="flex items-center space-x-1">
                    <p className="text-gray-500 pr-1">Qty:</p>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, item.quantity, parseInt(e.target.value))
                      }
                      className="w-16 rounded-md border border-gray-300 px-2 py-1 text-sm"
                    />
                  </div>
                  <div className="flex items-center ml-4">
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="bg-transparent hover:bg-gray-100 p-2 rounded-full"
                    >
                      <Image
                        src="/icons/delete.svg"
                        alt="Remove item"
                        width={30}
                        height={30}
                        className="text-red-500 hover:text-red-600 cursor-pointer"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
            <p className="text-lg font-bold">Total amount: ${totalAmount.toFixed(2)}</p>
            {cart && (
              <button
                onClick={onProceedToCheckout}
                className="bg_light_green hover:bg-green-900 rounded-md py-2 px-4 text-white mt-4 sm:mt-0"
              >
                Proceed to Checkout
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-8 flex items-center justify-between gap-1">
          <p>Your cart is empty.</p>
          <Link href="/products" className="highlight_text hover:text-gray-300">
            <p className="mt-1 flex flex-col items-center">Continue Shopping</p>
          </Link>
        </div>
      )}
    </section>
  );
};

export default CartSummary;