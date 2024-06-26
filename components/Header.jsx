"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useContext } from 'react';
import { CartContext } from '@app/layout';

const Header = () => {
  const { cusId, setCusId, cartItemCount, setCartItemCount } = useContext(CartContext);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cus_id = localStorage.getItem("cusId");
      if (cus_id) setCusId(cus_id);
      if (!cus_id) setCusId(null);
      setCartItemCount(localStorage.getItem("cartItemCount"));
    }
  }, [setCusId, cartItemCount]);

  return (
    <nav className="flex justify-between w-full py-10 px-10">
      <Link href="/" className="pt-3 flex flex-col items-start ml-4">
        <Image src="/logo-green.svg" alt="logo" width={170} height={50} />
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        <div className="flex flex-col items-end mr-4 h-full justify-center">
          <div className="flex gap-3 md:gap-6">
            <Link className="pt-3 text-lg" href="/products">
              Shop
            </Link>
            <Link className="pt-3 text-lg" href="/cart">
              Cart {cartItemCount > 0 && `(${cartItemCount})`}
            </Link>
            {!cusId && (
              <Link href="/login">
                <button className="bg_color hover:bg-lime-950 text-white font-bold mt-1 py-2 px-4 rounded-[10px] transition-colors duration-300">
                  Log In
                </button>
              </Link>
            )}
            {cusId && (
              <Link href={`/account/${cusId}`}>
                <Image
                  className="py-2 px-2"
                  src="/icons/profile.svg"
                  alt="account"
                  width={50}
                  height={50}
                />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {cusId ? (
          <div className="flex">
            <Image
              src="/icons/menu.svg"
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div
                className="dropdown"
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  zIndex: 100,
                  backgroundColor: "white",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  borderRadius: "0.5rem",
                  padding: "0.5rem",
                }}
              >
                <Link
                  href={`/account/${cusId}`}
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Account
                </Link>
                <Link
                  href="/products"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Shop
                </Link>
                <Link
                  href="/cart"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Cart
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="flex">
            <Link href="/login">
              <button className="bg_color hover:bg-lime-950 text-white text-sm font-bold mt-1 py-2 px-4 rounded-[10px] transition-colors duration-300">
                Log In
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;