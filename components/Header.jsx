"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useContext } from 'react';
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { CartContext } from '@app/layout';

const Header = () => {
  const {data : session } = useSession();
  const { setCusId, cartItemCount, setCartItemCount } = useContext(CartContext);

  const [ providers, setProviders ] = useState(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response)
    }

    setUpProviders();
  }, [])

    // Add a null check for session.user
    useEffect(() => {
      if (session?.user?.cusId) {
         setCusId(session.user.cusId);

         if(!(localStorage.getItem("cusId"))){
          localStorage.setItem("cusId", session.user.cusId)
         }

         if(!(localStorage.getItem("userId"))){
          localStorage.setItem("userId", session.user.id)
         }      
      }

      if (typeof window !== 'undefined') {  
        setCartItemCount(localStorage.getItem("cartItemCount"))
      }

    }, [session, setCusId, cartItemCount]);

  return (
    <nav className="flex justify-between w-full py-10 px-10">

          <Link href="/" className="pt-3 flex flex-col items-start ml-4">
            <Image src="/logo-green.svg" alt="logo" width={170} height={50} />
          </Link>
         
        <div className="flex flex-col items-end mr-4 h-full justify-center">
          <div className="flex gap-3 md:gap-6">
            <Link className="pt-3 text-lg" href='/products'>
              Shop
            </Link>
            
            <Link className="pt-3 text-lg" href='/cart'>
            Cart {cartItemCount > 0 && `(${cartItemCount})`}
            </Link>
             
            <>
              {!session && providers && Object.values(providers).map((provider) => (
                <button
                className="bg_color :bg-lime-950 text-white font-bold mt-1  py-2 px-4 rounded-[10px] transition-colors duration-300"
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  Log In
                </button>
              ))}
              </>
              {session?.user && 
                <Link href={`/account/${session?.user?.cusId}`}>
                 <Image
                 className="py-2 px-2"
                   src="/icons/profile.svg" alt="account" width={50} height={50} />
              </Link> }
              
          </div>
        </div>
    </nav>
  )
}

export default Header
