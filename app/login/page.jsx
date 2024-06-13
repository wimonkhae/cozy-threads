"use client";

import AuthForm from "@components/AuthForm";
import Image from "next/image";
import { useState, useEffect, useContext } from 'react';
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { CartContext } from "@app/layout";


const Login = ({ router }) => {
 const [isSignup, setIsSignup] = useState(false);
 const {data : session } = useSession();
 const { cusId, setCusId, cartItemCount, setCartItemCount } = useContext(CartContext);
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
      
        window.location.href = `/account/${cusId}`;
      
    }

    if (typeof window !== 'undefined') {  
      setCartItemCount(localStorage.getItem("cartItemCount"))
    }

  }, [session, setCusId, cartItemCount, router]);

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn('google', { redirect: false });
      if (!result.error && session?.user?.id) {
        // Redirect the user to the account page URL
        router.push(`/account/${session.user.id}`);
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

    return (
      <section className="py-10 px-14 base max-w-[100%] text-center">
         <h2 className="text-3xl font-bold pr-2 mb-10">{isSignup ? 'Sign Up' : 'Log In'}</h2>
             
        <AuthForm toggleForm={toggleForm} />

        <div className="flex flex-col">
          <p  className="mb-4">or log in with your Stripe Google Account</p> 
          {providers && Object.values(providers).map((provider) => (
              <button
                className="login flex items-center hover:bg-gray-200 px-4 py-2 rounded-[10px] max-w-28 border border-gray-300 transition-colors duration-300"
                type="button"
                key={provider.name}
                // onClick={() => signIn(provider.id)}
                onClick={handleGoogleSignIn}
              >
                <Image className="mr-2" src="/icons/google.png" alt="Google Logo" width={24} height={24} />
                <span>Log In</span>
              </button>
            ))}
        </div>
      </section>
    )

};

export default Login;