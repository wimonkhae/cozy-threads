"use client";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useState, useEffect, Fragment } from 'react';

import Image from "next/image";
import Link from "next/link";
import AuthForm from "@components/AuthForm";

const Logout = () => {

    const logout = async () => {
        try {
            // Clear the user's session and local storage
            await signOut({ redirect: false });
            localStorage.clear();
            // Redirect the user to the login page
            window.location.href = "/";
          } catch (error) {
            console.error("Error signing out:", error);
          }
    }
  

  return (
    <section className="py-10 px-14">
      <h3 className="text-3xl font-bold pr-2">Log Out</h3>
    </section>
  )
}

export default Logout