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

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      
      setProviders(response)

      const localStorageUser = localStorage.getItem('user')
      console.log(localStorageUser);
      // setLocalUser(localStorageUser)
    }

    setUpProviders();
  }, [])

  console.log("log local", localUser);

  const handleSignOut = () => {
    // Remove cusId from local storage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cusId');
    }
    signOut();
  };


  if (!session && !localUser) {
    return (
      <section className="py-10 px-14">
        <h3 className="text-3xl font-bold pr-2">My Account</h3>
        <div className="mt-10 px-2">
          <Image
            className="mb-4 ml-1"
            src="/icons/profile.svg" alt="account" width={80} height={80} 
          />
          <Fragment>
            {'Please '}
            {providers && Object.values(providers).map((provider) => (
              <Link
                className="highlight_text text-lg hover:text-green-900"
                href="" 
                onClick={() => signIn(provider.id)}
              >
                log in or sign up with
              </Link>
            ))}
            
            {` to continue.`}
          </Fragment>
          {!session && providers && Object.values(providers).map((provider) => (
            <button
              className="flex hover:bg-gray-100 font-bold mt-1  py-2 px-4 rounded-[10px] border  transition-colors duration-300"
              type="button"
              key={provider.name}
              onClick={() => signIn(provider.id)}
            >
              <Image src='/icons/google.png' alt="Google Logo" width={24} height={24} className="mr-2" />
              Log In
            </button>
          ))}
 
        </div>
      </section>
    )
  }
  if (session || localUser) {
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
      
          <Link href={`/account/${params.id}/orders`}>
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