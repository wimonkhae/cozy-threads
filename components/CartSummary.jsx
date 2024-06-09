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
        alert('Error creating Stripe checkout session. Please try again later.');
      }
    } catch (error) {
      console.error('Error creating Stripe checkout session:', error);
      alert('Error creating Stripe checkout session. Please try again later.');
    }

  }

  return (
    <section >
      {cart && totalAmount > 0 ? (
        <>
          <ul className="space-y-4 max-w-lg mx-auto flex flex-wrap">
            {[...cart].map((item) => (
              <li key={item.id} className="bg-white p-4 w-full rounded-md shadow-md flex items-center justify-between">
                <div className="flex items-center space-x-4 w-ful ">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-md mr-10"
                  />
                  <div className="mx-10 space-x10 flex flex-col" >
                    <h3 className="text-lg font-bold flex">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 flex">
                      ${item.price}
                    </p>
                  </div>
                </div>
                <div className="flex items-center ml-20 space-x-1 ">
                <p className="text-gray-500 flex pr-1"> Qty: </p>
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
                
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="bg-transparent hover:bg-gray-100 p-2 rounded-full"
                >
                  <Image
                    src="/icons/delete.svg"
                    alt="Remove item"
                    width={20}
                    height={20}
                    className="text-red-500 hover:text-red-600 cursor-pointer"
                  />
                </button>

              </li>
            ))}
          </ul>
          <p className="mt-4 font-bold">Total amount: ${totalAmount.toFixed(2)}</p>
          {cart && (
            <button
              onClick={onProceedToCheckout}
              className="bg_light_green hover:bg-green-900 mt-4 rounded-md bg-blue-500 py-2 px-4 text-white hover:bg-blue-600"
            >
              Proceed to Checkout
            </button>
          )}
        </>
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