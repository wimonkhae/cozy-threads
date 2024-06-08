"use client";

import { useContext, useState, useMemo } from 'react';
import { CartContext } from '@app/layout';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import EmbededCheckout from './backup_EmbededCheckout';
import HostedCheckout from './HostedCheckout';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CartSummary = () => {

  const { cart, updateCartItemQuantity, cartItemCount, setCheckedOut } = useContext(CartContext);
  const [isCheckoutComplete, setIsCheckoutComplete] = useState(false);
  const router = useRouter();

  // Create a Map to store the unique items and their quantities
  const itemQuantityMap = new Map();
  cart.forEach((item) => {
    if (itemQuantityMap.has(item.id)) {
      itemQuantityMap.set(item.id, itemQuantityMap.get(item.id) + 1);
    } else {
      itemQuantityMap.set(item.id, 1);
    }
  });

  const [updatedQuantities, setUpdatedQuantities] = useState({});

  const handleQuantityChange = (itemId, quantity) => {
    setUpdatedQuantities((prevState) => ({
      ...prevState,
      [itemId]: quantity,
    }));
    updateCartItemQuantity(itemId, quantity);
  };

  const isItemInCart = cartItemCount > 0;


  // Recalculate the total amount based on updated quantities
  const totalAmount = useMemo(() => {
    return [...itemQuantityMap].reduce((acc, [id, quantity]) => {
      const item = cart.find((i) => i.id === id);
      return acc + item.price * (updatedQuantities[id] || quantity);
    }, 0);
  }, [itemQuantityMap, updatedQuantities, cart]);


  const onProceedToCheckout = () => {
    router.push('/checkout');
    // <HostedCheckout/>
  };


  const handleCheckout = async () => {
    setIsCheckoutComplete(true);
    setCheckedOut(true);
    // Add any additional logic, such as clearing the cart
    router.push('/success');
  };



  return (
    <section>
      {isItemInCart ? (
        <>
          <p className="mt-4 font-bold">Total items in cart: {cartItemCount}</p>
          <ul>
            {[...itemQuantityMap].map(([id, quantity]) => (
              <li key={id} className="flex items-center gap-2">
                <Image src={cart.find((item) => item.id === id).image} alt={cart.find((item) => item.id === id).name} width={40} height={40} />
                {cart.find((item) => item.id === id).name} - ${cart.find((item) => item.id === id).price}
                <input
                  type="number"
                  min="1"
                  value={updatedQuantities[id] || quantity}
                  onChange={(e) => handleQuantityChange(id, parseInt(e.target.value))}
                  className="ml-2 w-16 rounded-md border border-gray-300 px-2 py-1 text-sm"
                />
              </li>
            ))}
          </ul>
          <p className="mt-4 font-bold">Total amount: ${totalAmount.toFixed(2)}</p>
          {isItemInCart && (
            <button
              onClick={onProceedToCheckout}
              className="mt-4 rounded-md bg-blue-500 py-2 px-4 text-white hover:bg-blue-600"
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
      {isCheckoutComplete && (
        <div className="mt-8 flex items-center justify-between gap-1">
          <p>Thank you for your order!</p>
          <Link href="/products" className="highlight_text hover:text-gray-300">
            <p className="mt-1 flex flex-col items-center">Continue Shopping</p>
          </Link>
        </div>
      )}
    </section>
  );
};

export default CartSummary;