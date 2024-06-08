"use client";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useState, useEffect, Fragment } from 'react';

import Image from "next/image";
import Link from "next/link";

const Account = () => {
  const { data: session, status } = useSession();
  const [ providers, setProviders ] = useState(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      
      setProviders(response)

    }

    setUpProviders();
  }, [])

  const handleSignOut = () => {
    // Remove cusId from local storage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cusId');
    }
    signOut();
  };


  if (!session) {
    return (
      <section className="py-10 px-14">
        <h3 className="text-3xl font-bold pr-2">My Account</h3>
        <div className="mt-10 px-2">
          <Image
            className="mb-4 ml-1"
            src="../icons/profile.svg" alt="account" width={80} height={80} 
          />
          <Fragment>
            {'Please '}
            {providers && Object.values(providers).map((provider) => (
              <Link
                className="highlight_text text-lg hover:text-green-900"
                href="" 
                onClick={() => signIn(provider.id)}
              >
                log in or sign up
              </Link>
            ))}
            
            {` to continue.`}
          </Fragment>
      
        </div>
      </section>
    )
  }
  if (session) {
    return (
        <section className="py-10 px-14">
          <h3 className="text-3xl font-bold pr-2">My Account</h3>
          <div className="mt-10 px-2">
            <Image
              className="mb-4 ml-4"
              src="../icons/profile.svg" alt="account" width={80} height={80} 
            />
    
          <div className="ml-4 mb-4">
            <h4 className="font-bold mb-2">Account Information</h4>
            <p>Username: {session.user.name}</p>
            <p>Email: {session.user.email}</p>
          </div>
    
          <Link href="/orders">
            <button className="ml-4 mb-4 bg_color hover:bg-lime-950  text-white font-bold py-2 px-4 rounded-[10px] transition-colors duration-300">
              View Orders
            </button>
          </Link>
    
          <button className="ml-4 mb-4 bg_color hover:bg-lime-950 text-white font-bold py-2 px-4 rounded-[10px] transition-colors duration-300"
            onClick={handleSignOut} >
            Log out
          </button>
        </div>`
      </section>
    )
  }
}

export default Account