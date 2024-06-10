"use client";

import AuthForm from "@components/AuthForm";
import Image from "next/image";
import { useState } from "react";


const Login = () => {
 const [isSignup, setIsSignup] = useState(false);

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };


    return (
      <section className="py-10 px-14">
         <h2 className="text-3xl font-bold pr-2">{isSignup ? 'Sign Up' : 'Log In'}</h2>
            <Image
            className="mb-6 ml-1 mt-10 mx-2"
            src="/icons/profile.svg" alt="account" width={80} height={80} 
          />
        <AuthForm toggleForm={toggleForm} />
      </section>
    )

};

export default Login;