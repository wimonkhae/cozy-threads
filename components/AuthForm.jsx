"use client";
import Image from 'next/image';
import { useState } from 'react';

const AuthForm = ({ toggleForm }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth', {
        method: isSignup ? 'POST' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        // Handle successful sign-up or login
        const res = await response.json()
        console.log('Success!', res); 
  
        const custId = res.user.cusId
        localStorage.setItem("userId", res.user.userId)
        localStorage.setItem("cusId", custId)
        localStorage.setItem("user_name", name)
        localStorage.setItem("user", JSON.stringify(res.user))
        
        // Redirect to the /account URL
        if(custId){
         window.location.href = `/account/${custId}`;
        }  

      } else {
        // Handle error
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div className="flex w-16 my-4">
          <label className='pr-10 font-bold' htmlFor="email">Name:</label>
          <input
            className='border rounded-md border border-gray-300 focus:border-green-900 px-2 py-1 text-sm'
            type="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex w-16 my-4">
          <label className='pr-10 font-bold' htmlFor="email">Email:</label>
          <input
            className='border rounded-md border border-gray-300 focus:border-green-900 px-2 py-1 text-sm'
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex w-16 my-1">
          <label className='pr-2 font-bold' htmlFor="password">Password:</label>
          <input  
            className='border rounded-md border border-gray-300 focus:border-green-900 px-2 py-1 text-sm'
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div> 
        <button 
            className="bg_color :bg-lime-950 text-white font-bold mt-4 py-2 px-4 rounded-[10px] transition-colors duration-300"
            type="submit">
                Enter
        </button>
      </form>
      
      <button className="mt-4"
      onClick={toggleForm}>
        {isSignup ? 'Already have an account? Log In' : 'Don\'t have an account? Sign Up'}
      </button>
      <div className="border-b border-gray-300 my-4 max-w-96"></div>

    </div>
  );
};

export default AuthForm;