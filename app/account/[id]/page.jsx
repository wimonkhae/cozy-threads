"use client";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useState, useEffect, Fragment } from 'react';

import Image from "next/image";
import Link from "next/link";
import AuthForm from "@components/AuthForm";

const Account = ({ params }) => {
  const { data: session, status } = useSession();
  const [ providers, setProviders ] = useState(null);
  const [ localUser, setLocalUser ] = useState(null)

  useEffect(() =>{
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response)
    }
    setUpProviders();

    const local = localStorage.getItem('user')
    
    if (typeof window !== 'undefined' && local) { 
  
      const localStorageUser = JSON.parse(local)
      localStorageUser.name = localStorage.getItem('user_name')
      setLocalUser(localStorageUser)
    }
 
  },[])



  const handleSignOut = async () => {
    try {
      // Clear the user's session and local storage
      await signOut({ redirect: false });
      localStorage.clear();
      // Redirect the user to the login page
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  console.log("localuse", localUser, )
  console.log('session', session?.user)

  if (!localUser && !session?.user) {
    return (
      <section className="py-10 px-14 max-w-[100%] text-center mb-2">
        <h3 className="text-3xl font-bold pr-2">My Account</h3>
        <div className="mt-10 px-2">
          <Image
            className="text-transparent mx-auto"
            src="/icons/profile.svg" alt="account" width={80} height={80} 
          />
          <Fragment>
            {'Please '}
              <Link
                className="highlight_text text-lg hover:text-green-900"
                href="/login" 
              >
                log in or sign up 
              </Link>
            {` to continue.`}
          </Fragment>
        </div>
      </section>
    )
  } else {
    return (
      <section className="py-10 px-14 max-w-[100%] text-center mb-2">
        <h3 className="text-3xl font-bold pr-2">My Account</h3>
        <div className="mt-10 px-2">
          <Image
            className="text-transparent mx-auto"
            src="../icons/profile.svg" alt="account" width={80} height={80} 
          />

        <div className="ml-4 my-4">
          <h4 className="font-bold mb-2">Account Information</h4>
          <p>Username: {localUser ? localUser?.username : session?.user?.name}</p>
             
          <p>Email:{localUser ? localUser?.email : session?.user?.email}</p>
        </div>
    
        <Link
          href={
            localUser
              ? `/account/${localUser.cusId}/orders`
              : session?.user
                ? `/account/${session.user.cusId}/orders`
                : '/'
          }
        >
          <button className="ml-4 mb-4 bg_color hover:bg-lime-950  text-white font-bold py-2 px-4 rounded-[10px] transition-colors duration-300">
            View Orders
          </button>
        </Link>

        <button className="ml-4 mb-4 bg_color hover:bg-lime-950 text-white font-bold py-2 px-4 rounded-[10px] transition-colors duration-300"
          onClick={handleSignOut} >
          Log out
        </button>
      </div>
    </section>
    )
  }
}

export default Account